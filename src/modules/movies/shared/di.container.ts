import { Container } from "inversify";
import { Locator } from "./di.enums";
import { Controller } from "../../../shared/domain/controller";
import ListMoviesUseCase from "../application/use-cases/list-movies.usecase";
import { ListMoviesDto } from "../infrastructure/dtos/list-movies.dto";
import {
  GetMoviesExternalParams,
  GetMoviesApiResponse,
  MovieExternal,
} from "../infrastructure/externals/types/get-movies-external.type";
import { Pagination } from "../../../shared/domain/pagination.interface";
import { IUseCase } from "../../../shared/domain/usecase";
import { IExternal } from "../../../shared/domain/external";
import GetMoviesExternal from "../infrastructure/externals/get-movies.external";
import { SubscriptionMongoRepository } from "../../subscriptions/infrastructure/database/subscription-mongo.repository";
import { WatchedMovieRepository } from "../infrastructure/database/watched-movie.repository";
import GetMovieExternal from "../infrastructure/externals/get-movie.external";
import {
  GetMovieExternalParams,
  MovieDetailsExternal,
} from "../infrastructure/externals/types/get-movie.external.types";
import { GetAvailableGenresDto } from "../infrastructure/dtos/get-available-genres.dto";
import GetAvailableGenresUseCase from "../application/use-cases/get-available-genres.usecase";
import SaveWatchedMovieUseCase from "../application/use-cases/save-watched-movie.usecase";
import { WatchedMovieDto } from "../infrastructure/dtos/save-watched-movie.dto";
import { WatchedMovie } from "../domain/entities/movie.entity";
import { RemoveWatchedMovieDto } from "../infrastructure/dtos/remove-watched-movie.dto";
import SaveWatchedMovieController from "../infrastructure/http/controllers/save-watched-movie.controller";
import RemoveWatchedMovieController from "../infrastructure/http/controllers/remove-watched-movie.controller";
import ListMoviesController from "../infrastructure/http/controllers/list-movies.controller";
import { IWatchedMovieRepository } from "../domain/repositories/watched-movie-repository.interface";
import RemoveWatchedMovieUseCase from "../application/use-cases/remove-watched-movie.usecase";
import { ISubscriptionRepository } from "../../subscriptions/domain/repositories/subscription-repository.interface";

const container = new Container();

container
  .bind<Controller>(Locator.ListMoviesController)
  .to(ListMoviesController);

container
  .bind<IUseCase<ListMoviesDto, Pagination<MovieExternal>>>(
    Locator.ListMoviesUseCase
  )
  .to(ListMoviesUseCase);

container
  .bind<IExternal<GetMoviesExternalParams, GetMoviesApiResponse>>(
    Locator.GetMoviesExternal
  )
  .to(GetMoviesExternal);

container
  .bind<ISubscriptionRepository>(Locator.SubscriptionRepository)
  .to(SubscriptionMongoRepository);

container
  .bind<IWatchedMovieRepository>(Locator.WatchedMovieRepository)
  .to(WatchedMovieRepository);

container
  .bind<IExternal<GetMovieExternalParams, MovieDetailsExternal>>(
    Locator.GetMovieExternal
  )
  .to(GetMovieExternal);

container
  .bind<IUseCase<GetAvailableGenresDto, number[]>>(
    Locator.GetAvailableGenresUseCase
  )
  .to(GetAvailableGenresUseCase);

container
  .bind<IUseCase<WatchedMovieDto, WatchedMovie>>(
    Locator.SaveWatchedMovieUseCase
  )
  .to(SaveWatchedMovieUseCase);

container
  .bind<Controller>(Locator.SaveWatchedMovieController)
  .to(SaveWatchedMovieController);

container
  .bind<Controller>(Locator.RemoveWatchedMovieController)
  .to(RemoveWatchedMovieController);

container
  .bind<IUseCase<RemoveWatchedMovieDto, void>>(
    Locator.RemoveWatchedMovieUseCase
  )
  .to(RemoveWatchedMovieUseCase);

export { container };
