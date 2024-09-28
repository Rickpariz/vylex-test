import { injectable } from "inversify";
import { Model, model } from "mongoose";

import { CreateSubscriptionDto } from "../dtos/create-subscription.dto";
import { connectDatabase } from "../../../../shared/infrastructure/database/mongodb";
import {
  Subscription,
  SubscriptionWithPackageAndGenres,
} from "../../domain/entities/subscription.entity";
import { SubscriptionSchema } from "../../domain/schema/subscription.schema";
import {
  FindParams,
  ISubscriptionRepository,
} from "../../domain/repositories/subscription-repository.interface";

@injectable()
export class SubscriptionMongoRepository implements ISubscriptionRepository {
  constructor() {
    this.collection = model<Subscription>("subscriptions", SubscriptionSchema);
  }
  private collection: Model<Subscription>;

  private async connect() {
    await connectDatabase();
  }

  async create(data: CreateSubscriptionDto): Promise<Subscription> {
    await this.connect();
    const subscription = await this.collection.create(data);
    return subscription;
  }

  async findMany(
    data: FindParams
  ): Promise<SubscriptionWithPackageAndGenres[]> {
    await this.connect();
    const subscriptions = (await this.collection
      .find({
        users: data.userId,
      })
      .populate({
        path: "package",
        select: "genres",
        populate: { path: "genres", select: "name externalId" },
      })
      .lean()) as unknown as SubscriptionWithPackageAndGenres[];

    return subscriptions;
  }
}
