import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { Locator } from "../../shared/di.enums";
import { IExternal } from "../../../../shared/domain/external";
import { Validate } from "../../../../shared/infrastructure/decorators/validation.decorator";
import {
  WatchedMovieDto,
  watchedMovieDtoSchema,
} from "../../infrastructure/dtos/save-watched-movie.dto";
import { WatchedMovie } from "../../domain/entities/movie.entity";
import {
  GetMovieExternalParams,
  MovieDetailsExternal,
} from "../../infrastructure/externals/types/get-movie.external.types";
import { GetAvailableGenresDto } from "../../infrastructure/dtos/get-available-genres.dto";
import { Unauthorized } from "../../../../shared/infrastructure/http/responses";
import { IWatchedMovieRepository } from "../../domain/repositories/watched-movie-repository.interface";
import { ISubscriptionRepository } from "../../../subscriptions/domain/repositories/subscription-repository.interface";

@injectable()
export default class SaveWatchedMovieUseCase
  implements IUseCase<WatchedMovieDto, WatchedMovie>
{
  constructor(
    @inject(Locator.GetMovieExternal)
    readonly getMovieExternal: IExternal<
      GetMovieExternalParams,
      MovieDetailsExternal
    >,
    @inject(Locator.SubscriptionRepository)
    readonly subscriptionRepository: ISubscriptionRepository,

    @inject(Locator.WatchedMovieRepository)
    readonly repository: IWatchedMovieRepository,

    @inject(Locator.GetAvailableGenresUseCase)
    readonly getAvailableGenresUseCase: IUseCase<
      GetAvailableGenresDto,
      number[]
    >
  ) {}

  @Validate(watchedMovieDtoSchema)
  async execute(data: WatchedMovieDto): Promise<WatchedMovie> {
    const { movieId, user } = data;

    const movie = await this.getMovieExternal.call({ movieId });

    const isMovieGenresValid = await this.validateMovieGenres(movie, data);

    if (!isMovieGenresValid)
      throw Unauthorized("User is not permission to watch movie");

    const watchedMovie = await this.repository.create({
      movie: {
        id: movie.id,
        title: movie.title,
        genres: movie.genres.map((genre) => genre.id),
      },
      userId: user.id,
    });

    return watchedMovie;
  }

  private async validateMovieGenres(
    movie: MovieDetailsExternal,
    data: WatchedMovieDto
  ) {
    const { user } = data;

    const avaialbleGenres = await this.getAvailableGenresUseCase.execute({
      userId: user.id,
    });

    const moviesGenres = movie.genres.map((genre) => genre.id);

    return moviesGenres.some((movieGenre) =>
      avaialbleGenres.includes(movieGenre)
    );
  }
}
