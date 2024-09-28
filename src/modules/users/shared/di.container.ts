import { Container } from "inversify";
import { Controller } from "../../../shared/domain/controller";
import { Locator } from "./di.enums";
import { IUseCase } from "../../../shared/domain/usecase";
import { CreateUserUseCaseDto } from "../infrastructure/dtos/create-user.dto";
import { User } from "../domain/entities/user.entity";
import CreateUserUseCase from "../application/use-cases/create-user.usecase";
import { PrismaClientLocator } from "../../../shared/domain/enums/di.enums";
import { PrismaClient } from "@prisma/client";
import UserRepository from "../infrastructure/database/user.repository";
import { UpdateUserUseCaseDto } from "../infrastructure/dtos/update-user.dto";
import { WatchedMovieRepository } from "../../movies/infrastructure/database/watched-movie.repository";
import { GenresMongoRepository } from "../../genres/infrastructure/database/genres-mongo.repository";
import { Report } from "../domain/entities/report.entity";
import ReportUsecase from "../application/use-cases/report.usecase";
import CreateUserController from "../infrastructure/http/controllers/create-user.controller";
import UpdateUserController from "../infrastructure/http/controllers/update-user.controller";
import ReportController from "../infrastructure/http/controllers/report.controller";
import { IUserRepository } from "../domain/repositories/user-repository.interface";
import { IWatchedMovieRepository } from "../../movies/domain/repositories/watched-movie-repository.interface";
import { IGenresRepository } from "../../genres/domain/repositories/genres-repository.interface";
import UpdateUserUseCase from "../application/use-cases/update-user.usecase";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<Controller>(Locator.CreateUserController)
  .to(CreateUserController);

container
  .bind<Controller>(Locator.UpdateUserController)
  .to(UpdateUserController);

container.bind<Controller>(Locator.ReportController).to(ReportController);

// UseCases Injection
container
  .bind<IUseCase<CreateUserUseCaseDto, User>>(Locator.CreateUserUseCase)
  .to(CreateUserUseCase);

container
  .bind<IUseCase<UpdateUserUseCaseDto, User>>(Locator.UpdateUserUseCase)
  .to(UpdateUserUseCase);

container
  .bind<IUseCase<void, Report[]>>(Locator.ReportUseCase)
  .to(ReportUsecase);

// Repositories Injection
container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);
container
  .bind<IWatchedMovieRepository>(Locator.WatchedMovieRepository)
  .to(WatchedMovieRepository);
container
  .bind<IGenresRepository>(Locator.GenresRepository)
  .to(GenresMongoRepository);
