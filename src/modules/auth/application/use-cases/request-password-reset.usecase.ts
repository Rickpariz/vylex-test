import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { Validate } from "../../../../shared/infrastructure/decorators/validation.decorator";
import { Locator } from "../../shared/di.enums";
import * as jwt from "jsonwebtoken";
import { JWT_ROLES } from "../../../../shared/domain/enums/jwt-roles";
import {
  RequestPasswordResetDto,
  requestPasswordResetDtoSchema,
} from "../../infrastructure/dtos/request-password-reset.dto";
import { AccessToken } from "../../domain/entities/access-token.entity";
import { IUserRepository } from "../../../users/domain/repositories/user-repository.interface";
import { NotFound } from "../../../../shared/infrastructure/http/responses";
import { IExternal } from "../../../../shared/domain/external";
import { SendResetPasswordEmailExternalParams } from "../../infrastructure/externals/types/send-reset-password-email-external.types";

@injectable()
export default class RequestPasswordResetUseCase
  implements IUseCase<RequestPasswordResetDto, AccessToken>
{
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository,
    @inject(Locator.SendResetPasswordEmailExternal)
    readonly sendResetPasswordeEmail: IExternal<
      SendResetPasswordEmailExternalParams,
      void
    >
  ) {}

  @Validate(requestPasswordResetDtoSchema)
  async execute(data: RequestPasswordResetDto): Promise<AccessToken> {
    const { email } = data;

    const user = await this.repository.findByEmail(email);

    if (!user) throw NotFound("user not found");

    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: [JWT_ROLES.RESET_PASSWORD],
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: String(process.env.JWT_RESET_PASSWORD_EXPIRES_IN),
      }
    );

    await this.sendResetPasswordeEmail.call({
      email: user.email,
      name: user.name,
      token: accessToken,
    });

    return {
      token: accessToken,
    };
  }
}
