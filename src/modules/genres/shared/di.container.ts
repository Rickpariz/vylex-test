import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { PrismaClientLocator } from "../../../shared/domain/enums/di.enums";
import { IExternal } from "../../../shared/domain/external";
import { Genre, GenreExternal } from "../domain/entities/genre.entity";
import { Locator } from "./di.enums";
import GetGenresExternal from "../infrastructure/externals/get-genres.external";
import { IUseCase } from "../../../shared/domain/usecase";
import ExtractGenresUseCase from "../application/use-cases/extract-genres.usecase";
import {
  Controller,
  IController,
} from "../../../shared/domain/controller";
import { GenresMongoRepository } from "../infrastructure/database/genres-mongo.repository";
import { IMapper } from "../../../shared/domain/mappers";
import MapGenresExternalToGenreEntityMapper from "../infrastructure/mappers/map-genres-external-to-genre-entity.mapper";
import { listGenresDto } from "../infrastructure/dtos/list-genres.dto";
import { Pagination } from "../../../shared/domain/pagination.interface";
import ListGenresUseCase from "../application/use-cases/list-genres.usecase";
import ExtractGenresController from "../infrastructure/http/controllers/extract-genres.controller";
import ListGenresController from "../infrastructure/http/controllers/list-genres.controller";
import { IGenresRepository } from "../domain/repositories/genres-repository.interface";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container
  .bind<IController<void, void>>(Locator.ExtractGenresController)
  .to(ExtractGenresController);

container
  .bind<Controller>(Locator.ListGenresController)
  .to(ListGenresController);

// UseCases Injection
container
  .bind<IUseCase<void, void>>(Locator.ExtractGenresUseCase)
  .to(ExtractGenresUseCase);

container
  .bind<IUseCase<listGenresDto, Pagination<Genre>>>(Locator.ListGenresUseCase)
  .to(ListGenresUseCase);

// Repositories Injection
container
  .bind<IGenresRepository>(Locator.GenresMongoRepository)
  .to(GenresMongoRepository);

// External Injection
container
  .bind<IExternal<void, GenreExternal[]>>(Locator.GetGenresExternal)
  .to(GetGenresExternal);

// Mappers Injection
container
  .bind<IMapper<GenreExternal, Genre>>(
    Locator.MapGenresExternalToGenreEntityMapper
  )
  .to(MapGenresExternalToGenreEntityMapper);
