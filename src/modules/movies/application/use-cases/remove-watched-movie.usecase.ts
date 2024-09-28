import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { Locator } from "../../shared/di.enums";
import { Validate } from "../../../../shared/infrastructure/decorators/validation.decorator";
import {
  RemoveWatchedMovieDto,
  removeWatchedMovieDtoSchema,
} from "../../infrastructure/dtos/remove-watched-movie.dto";
import { NotFound } from "../../../../shared/infrastructure/http/responses";
import { IWatchedMovieRepository } from "../../domain/repositories/watched-movie-repository.interface";

@injectable()
export default class RemoveWatchedMovieUseCase
  implements IUseCase<RemoveWatchedMovieDto, void>
{
  constructor(
    @inject(Locator.WatchedMovieRepository)
    readonly repository: IWatchedMovieRepository
  ) {}

  @Validate(removeWatchedMovieDtoSchema)
  async execute(data: RemoveWatchedMovieDto): Promise<void> {
    const { movieId } = data;

    const exists = await this.repository.exists({
      movieId,
      userId: data.user.id,
    });

    if (!exists) throw NotFound("Watched Movie not found");

    await this.repository.remove({ movieId, userId: data.user.id });

    return;
  }
}
