import { Container } from "inversify";
import { CreatePackageDto } from "../infrastructure/dtos/create-package.dto";
import { PrismaClient } from "@prisma/client";
import { PrismaClientLocator } from "../../../shared/domain/enums/di.enums";
import { IUseCase } from "../../../shared/domain/usecase";
import { Locator } from "./di.enums";
import { Controller } from "../../../shared/domain/controller";
import CreatePackageController from "../infrastructure/http/controllers/create-package-controller";
import { IPackageRepository } from "../domain/repositories/package-repository.interface";
import { PackageRepository } from "../infrastructure/database/package-mongo.repository";
import CreatePackageUseCase from "../application/use-cases/create-packages.usecase";
import { Package } from "../domain/entities/package.entity";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<Controller>(Locator.CreatePackageController)
  .to(CreatePackageController);

// Repositories Injection
container
  .bind<IPackageRepository>(Locator.PackageRepository)
  .to(PackageRepository);

// UseCases Injection
container
  .bind<IUseCase<CreatePackageDto, Package>>(Locator.CreatePackageUseCase)
  .to(CreatePackageUseCase);
