import { injectable } from "inversify";
import { IExternal } from "../../../../shared/domain/external";
import { TheMovieApi } from "../../../../shared/api/the-movie.api";
import { axiosError } from "../../../../shared/application/errors/axios-error";
import {
  GetMoviesApiResponse,
  GetMoviesExternalParams,
} from "./types/get-movies-external.type";
import { BadRequest } from "../../../../shared/infrastructure/http/responses";

@injectable()
export default class GetMoviesExternal
  implements IExternal<GetMoviesExternalParams, GetMoviesApiResponse>
{
  async call(params: GetMoviesExternalParams): Promise<GetMoviesApiResponse> {
    try {
      const { page = 1, genres } = params;

      const { data } = await TheMovieApi.get<GetMoviesApiResponse>(
        "/discover/movie",
        {
          params: {
            page,
            with_genres: genres.join(" | "),
          },
        }
      );

      return data;
    } catch (error) {
      axiosError(error);
      throw BadRequest("Error on get movies");
    }
  }
}
