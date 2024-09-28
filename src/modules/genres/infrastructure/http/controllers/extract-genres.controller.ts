import { inject, injectable } from "inversify";
import { IController } from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import logger from "../../../../../shared/infrastructure/logger";

@injectable()
export default class ExtractGenresController
  implements IController<void, void>
{
  constructor(
    @inject(Locator.ExtractGenresUseCase) readonly usecase: IUseCase<void, void>
  ) {}

  async execute() {
    try {
      await this.usecase.execute();
    } catch (error) {
      logger.error(`ExtractGenresController: ${error}`);
    }
  }
}
