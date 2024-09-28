import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { CreatePackageDto } from "../../dtos/create-package.dto";
import { Request } from "express";
import { Created } from "../../../../../shared/infrastructure/http/responses";
import { Package } from "../../../domain/entities/package.entity";

@injectable()
export default class CreatePackageController implements Controller {
  constructor(
    @inject(Locator.CreatePackageUseCase)
    readonly usecase: IUseCase<CreatePackageDto, Package>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const result = await this.usecase.execute(req.body);
    return Created(result);
  }
}
