import { Report } from "../../../users/domain/entities/report.entity";
import { WatchedMovie } from "../entities/movie.entity";

export type UserMovie = {
  movieId: number;
  userId: number;
};
export interface IWatchedMovieRepository {
  create(movie: WatchedMovie): Promise<WatchedMovie>;
  exists(params: UserMovie): Promise<boolean>;
  remove(params: UserMovie): Promise<void>;
  findByUserId(userId: number): Promise<WatchedMovie[]>;
  report(): Promise<Report[]>;
}
