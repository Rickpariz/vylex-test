import { Container } from "inversify";
import { Locator } from "./di.enum";
import { IUseCase } from "../../../shared/domain/usecase";
import { CreateSubscriptionDto } from "../infrastructure/dtos/create-subscription.dto";
import CreateSubscriptionUseCase from "../application/use-cases/create-subscription.usecase";
import { IPackageRepository } from "../../packages/domain/repositories/package-repository.interface";
import { PackageRepository } from "../../packages/infrastructure/database/package-mongo.repository";
import UserRepository from "../../users/infrastructure/database/user.repository";
import { SubscriptionMongoRepository } from "../infrastructure/database/subscription-mongo.repository";
import { Controller } from "../../../shared/domain/controller";
import { PrismaClient } from "@prisma/client";
import { PrismaClientLocator } from "../../../shared/domain/enums/di.enums";
import { IUserRepository } from "../../users/domain/repositories/user-repository.interface";
import CreateSubscriptionController from "../infrastructure/http/controllers/create-subscription.controller";
import { Subscription } from "../domain/entities/subscription.entity";
import { ISubscriptionRepository } from "../domain/repositories/subscription-repository.interface";

const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<Controller>(Locator.CreateSubscriptionController)
  .to(CreateSubscriptionController);

// Repositories Injection
container
  .bind<IPackageRepository>(Locator.PackageRepository)
  .to(PackageRepository);

container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);

container
  .bind<ISubscriptionRepository>(Locator.SubscriptionRepository)
  .to(SubscriptionMongoRepository);

// UseCases Injection
container
  .bind<IUseCase<CreateSubscriptionDto, Subscription>>(
    Locator.CreateSubscriptionUseCase
  )
  .to(CreateSubscriptionUseCase);

export { container };
