import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { WatchedMovieDto } from "../../dtos/save-watched-movie.dto";
import { WatchedMovie } from "../../../domain/entities/movie.entity";
import { Request } from "express";
import { Ok } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class SaveWatchedMovieController implements Controller {
  constructor(
    @inject(Locator.SaveWatchedMovieUseCase)
    readonly usecase: IUseCase<WatchedMovieDto, WatchedMovie>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { movieId } = req.params as unknown as WatchedMovieDto;
    const user = req.user;

    const result = await this.usecase.execute({
      movieId: Number(movieId),
      user: user!,
    });

    return Ok(result);
  }
}
