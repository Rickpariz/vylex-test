import { inject, injectable } from "inversify";
import { Locator } from "../../../shared/di.enums";
import {
  Controller,
  HttpResponse,
} from "../../../../../shared/domain/controller";
import { IUseCase } from "../../../../../shared/domain/usecase";
import { listGenresDto } from "../../dtos/list-genres.dto";
import { Genre } from "../../../domain/entities/genre.entity";
import { Pagination } from "../../../../../shared/domain/pagination.interface";
import { Request } from "express";
import { Ok } from "../../../../../shared/infrastructure/http/responses";

@injectable()
export default class ListGenresController implements Controller {
  constructor(
    @inject(Locator.ListGenresUseCase)
    readonly usecase: IUseCase<listGenresDto, Pagination<Genre>>
  ) {}

  async handle(req: Request): Promise<HttpResponse> {
    const query = req.query as unknown as listGenresDto;
    const result = await this.usecase.execute(query);
    return Ok(result);
  }
}
