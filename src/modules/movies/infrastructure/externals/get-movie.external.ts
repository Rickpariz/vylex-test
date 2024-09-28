import { injectable } from "inversify";
import { IExternal } from "../../../../shared/domain/external";
import { TheMovieApi } from "../../../../shared/api/the-movie.api";
import { axiosError } from "../../../../shared/application/errors/axios-error";
import {
  GetMovieExternalParams,
  MovieDetailsExternal,
} from "./types/get-movie.external.types";
import { BadRequest } from "../../../../shared/infrastructure/http/responses";

@injectable()
export default class GetMovieExternal
  implements IExternal<GetMovieExternalParams, MovieDetailsExternal>
{
  async call(params: GetMovieExternalParams): Promise<MovieDetailsExternal> {
    try {
      const { movieId } = params;

      const { data } = await TheMovieApi.get<MovieDetailsExternal>(
        `/movie/${movieId}`
      );

      return data;
    } catch (error) {
      axiosError(error);
      throw BadRequest("Error on get movie");
    }
  }
}
