import { inject, injectable } from "inversify";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Request } from "express";
import { ResetPasswordDto } from "../../dtos/reset-password.dto";
import { User } from "../../../../users/domain/entities/user.entity";
import { extractTokenFromHeaders } from "../../../../../shared/infrastructure/http/middlewares/auth";
import { Ok } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class ResetPasswordController implements Controller {
  constructor(
    @inject(Locator.ResetPasswordUseCase)
    readonly usecase: IUseCase<ResetPasswordDto, User>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const token = extractTokenFromHeaders(req);
    const user = await this.usecase.execute({ token, ...req.body });
    return Ok(user);
  }
}
