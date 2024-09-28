import { injectable } from "inversify";
import { IMapper } from "../../../../shared/domain/mappers";
import { Genre, GenreExternal } from "../../domain/entities/genre.entity";

@injectable()
export default class MapGenresExternalToGenreEntityMapper
  implements IMapper<GenreExternal, Genre>
{
  mapOne(data: GenreExternal): Genre {
    const { id, name } = data;
    return {
      name,
      externalId: id,
    };
  }

  mapMany(data: GenreExternal[]): Genre[] {
    return data.map((genre) => this.mapOne(genre));
  }
}
