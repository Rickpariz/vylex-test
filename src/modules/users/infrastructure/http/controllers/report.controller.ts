import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { Ok } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class ReportController implements Controller {
  constructor(
    @inject(Locator.ReportUseCase)
    readonly usecase: IUseCase<void, Report[]>
  ) {}

  async handle(): Promise<HttpResponse> {
    const report = await this.usecase.execute();
    return Ok(report);
  }
}
