import { inject, injectable } from "inversify";
import { Request } from "express";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { CreateUserUseCaseDto } from "../../dtos/create-user.dto";
import { User } from "../../../domain/entities/user.entity";
import { Created } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class CreateUserController implements Controller {
  constructor(
    @inject(Locator.CreateUserUseCase)
    readonly usecase: IUseCase<CreateUserUseCaseDto, User>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const user = await this.usecase.execute(req.body);
    return Created(user);
  }
}
