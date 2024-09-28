import {
  CreatePackageDto,
  createPackageDtoSchema,
} from "../../infrastructure/dtos/create-package.dto";
import { IPackageRepository } from "../../domain/repositories/package-repository.interface";
import { Validate } from "../../../../shared/infrastructure/decorators/validation.decorator";
import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { Locator } from "../../shared/di.enums";
import { Package } from "../../domain/entities/package.entity";

@injectable()
export default class CreatePackageUseCase
  implements IUseCase<CreatePackageDto, Package>
{
  constructor(
    @inject(Locator.PackageRepository)
    readonly repository: IPackageRepository
  ) {}

  @Validate(createPackageDtoSchema)
  async execute(data: CreatePackageDto): Promise<Package> {
    const _package = await this.repository.create(data);
    return _package;
  }
}
