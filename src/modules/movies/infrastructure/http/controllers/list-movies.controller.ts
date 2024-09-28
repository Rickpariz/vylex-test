import { inject, injectable } from "inversify";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { ListMoviesDto } from "../../dtos/list-movies.dto";
import { Pagination } from "../../../../../shared/domain/pagination.interface";
import { MovieExternal } from "../../externals/types/get-movies-external.type";
import { Request } from "express";
import { Ok } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class ListMoviesController implements Controller {
  constructor(
    @inject(Locator.ListMoviesUseCase)
    readonly usecase: IUseCase<ListMoviesDto, Pagination<MovieExternal>>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const { pageNumber, genres } = req.query as unknown as ListMoviesDto;
    const tokenUser = req.user;

    const result = await this.usecase.execute({
      pageNumber: pageNumber ? Number(pageNumber) : 1,
      genres: genres ? genres.map((genreId) => Number(genreId)) : [],
      user: tokenUser!,
    });

    return Ok(result);
  }
}
