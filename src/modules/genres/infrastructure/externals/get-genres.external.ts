import { injectable } from "inversify";
import { GenreApiResponse, GenreExternal } from "../../domain/entities/genre.entity";
import { IExternal } from "../../../../shared/domain/external";
import { TheMovieApi } from "../../../../shared/api/the-movie.api";
import { axiosError } from "../../../../shared/application/errors/axios-error";
import { BadRequest } from "../../../../shared/infrastructure/http/responses";

@injectable()
export default class GetGenresExternal
  implements IExternal<void, GenreExternal[]>
{
  async call(): Promise<GenreExternal[]> {
    try {
      const { data } = await TheMovieApi.get<GenreApiResponse>(
        "/genre/movie/list?language=en"
      );

      return data.genres;
    } catch (error) {
      axiosError(error);
      throw BadRequest("Error on get genres");
    }
  }
}
