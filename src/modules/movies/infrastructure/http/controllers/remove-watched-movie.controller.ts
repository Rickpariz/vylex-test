import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { RemoveWatchedMovieDto } from "../../dtos/remove-watched-movie.dto";
import { Request } from "express";
import { Ok } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class RemoveWatchedMovieController implements Controller {
  constructor(
    @inject(Locator.RemoveWatchedMovieUseCase)
    readonly usecase: IUseCase<RemoveWatchedMovieDto, void>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { movieId } = req.params as unknown as RemoveWatchedMovieDto;
    const user = req.user;

    const result = await this.usecase.execute({
      movieId: Number(movieId),
      user: user!,
    });

    return Ok(result);
  }
}
