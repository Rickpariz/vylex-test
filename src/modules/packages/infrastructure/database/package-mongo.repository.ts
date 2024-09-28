import { IPackageRepository } from "../../domain/repositories/package-repository.interface";
import { PackageSchema } from "../../domain/schemas/package.schema";
import { CreatePackageDto } from "../dtos/create-package.dto";
import { injectable } from "inversify";
import { Model, model } from "mongoose";
import { connectDatabase } from "../../../../shared/infrastructure/database/mongodb";
import { Package } from "../../domain/entities/package.entity";

@injectable()
export class PackageRepository implements IPackageRepository {
  constructor() {
    this.collection = model<Package>("packages", PackageSchema);
  }
  private collection: Model<Package>;

  private async connect() {
    await connectDatabase();
  }

  async create(data: CreatePackageDto): Promise<Package> {
    await this.connect();
    const _package = await this.collection.create(data);
    return _package;
  }

  async exists(_id: string): Promise<boolean> {
    await this.connect();
    const _package = await this.collection.countDocuments({ _id });
    return _package > 0;
  }
}
