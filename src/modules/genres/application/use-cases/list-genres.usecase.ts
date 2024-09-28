import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { listGenresDto } from "../../infrastructure/dtos/list-genres.dto";
import { Pagination } from "../../../../shared/domain/pagination.interface";
import { Genre } from "../../domain/entities/genre.entity";
import { Locator } from "../../shared/di.enums";
import { IGenresRepository } from "../../domain/repositories/genres-repository.interface";

@injectable()
export default class ListGenresUseCase
  implements IUseCase<listGenresDto, Pagination<Genre>>
{
  constructor(
    @inject(Locator.GenresMongoRepository)
    readonly repository: IGenresRepository
  ) {}

  async execute(data: listGenresDto): Promise<Pagination<Genre>> {
    const { search, pageSize, pageNumber } = data;
    const genres = await this.repository.find({
      search,
      pagination: {
        pageNumber,
        pageSize,
      },
    });
    return genres;
  }
}
