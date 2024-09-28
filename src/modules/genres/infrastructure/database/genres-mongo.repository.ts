import { injectable } from "inversify";
import { Model, model } from "mongoose";
import { Genre } from "../../domain/entities/genre.entity";
import { Pagination } from "../../../../shared/domain/pagination.interface";
import {
  DEFAULT_PAGE_SIZE,
  mapPagination,
} from "../../../../shared/application/pagination";
import { connectDatabase } from "../../../../shared/infrastructure/database/mongodb";
import {
  FindOneParams,
  FindParams,
  IGenresRepository,
} from "../../domain/repositories/genres-repository.interface";
import { GenreSchema } from "../../domain/schema/genre.schema";

@injectable()
export class GenresMongoRepository implements IGenresRepository {
  constructor() {
    this.collection = model<Genre>("genres", GenreSchema);
  }
  private collection: Model<Genre>;

  private async connect() {
    await connectDatabase();
  }

  async exists(): Promise<boolean> {
    await this.connect();
    const count = await this.collection.countDocuments({});
    return Boolean(count > 0);
  }

  async find(params: FindParams): Promise<Pagination<Genre>> {
    await this.connect();
    const {
      search,
      pagination: { pageNumber = 1, pageSize = DEFAULT_PAGE_SIZE },
    } = params;

    const findWhere = {
      ...(search ? { name: { $regex: new RegExp(search, "i") } } : {}),
    };

    const skip = (pageNumber - 1) * pageSize;

    const [list, count] = await Promise.all([
      this.collection
        .find(findWhere, "_id name externalId")
        .limit(pageSize)
        .skip(skip)
        .lean(),
      this.collection.countDocuments(findWhere),
    ]);

    const pagination = mapPagination({
      pageNumber,
      pageSize,
      total: count,
    });

    return {
      data: list,
      pagination,
    };
  }

  async createMany(genres: Genre[]): Promise<void> {
    await this.connect();
    await this.collection.insertMany(genres);
  }

  async findOne({ externalId }: FindOneParams): Promise<Genre | null> {
    await this.connect();
    return this.collection.findOne({ externalId }).lean();
  }
}
