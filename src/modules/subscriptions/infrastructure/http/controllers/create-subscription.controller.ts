import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enum";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { CreateSubscriptionDto } from "../../dtos/create-subscription.dto";
import { Subscription } from "../../../domain/entities/subscription.entity";
import { Request } from "express";
import { Created } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class CreateSubscriptionController implements Controller {
  constructor(
    @inject(Locator.CreateSubscriptionUseCase)
    readonly usecase: IUseCase<CreateSubscriptionDto, Subscription>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const result = await this.usecase.execute(req.body);
    return Created(result);
  }
}
