import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { Locator } from "../../shared/di.enums";
import { Report } from "../../domain/entities/report.entity";
import { IUserRepository } from "../../domain/repositories/user-repository.interface";
import { IWatchedMovieRepository } from "../../../movies/domain/repositories/watched-movie-repository.interface";
import { IGenresRepository } from "../../../genres/domain/repositories/genres-repository.interface";

@injectable()
export default class ReportUsecase implements IUseCase<void, Report[]> {
  constructor(
    @inject(Locator.UserRepository) readonly repository: IUserRepository,
    @inject(Locator.WatchedMovieRepository)
    readonly watchedMovieRepository: IWatchedMovieRepository,
    @inject(Locator.GenresRepository)
    readonly genresRepository: IGenresRepository
  ) {}

  async execute(): Promise<Report[]> {
    const report = await this.watchedMovieRepository.report();
    return report;
  }
}
