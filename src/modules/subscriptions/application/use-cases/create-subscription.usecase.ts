import { Validate } from "../../../../shared/infrastructure/decorators/validation.decorator";
import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import {
  CreateSubscriptionDto,
  createSubscriptionDtoSchema,
} from "../../infrastructure/dtos/create-subscription.dto";
import { Locator } from "../../shared/di.enum";
import { IPackageRepository } from "../../../packages/domain/repositories/package-repository.interface";
import { IUserRepository } from "../../../users/domain/repositories/user-repository.interface";
import { NotFound } from "../../../../shared/infrastructure/http/responses";
import { Subscription } from "../../domain/entities/subscription.entity";
import { ISubscriptionRepository } from "../../domain/repositories/subscription-repository.interface";

@injectable()
export default class CreateSubscriptionUseCase
  implements IUseCase<CreateSubscriptionDto, Subscription>
{
  constructor(
    @inject(Locator.SubscriptionRepository)
    readonly repository: ISubscriptionRepository,
    @inject(Locator.PackageRepository)
    readonly packageRepository: IPackageRepository,
    @inject(Locator.UserRepository)
    readonly userRepository: IUserRepository
  ) {}

  @Validate(createSubscriptionDtoSchema)
  async execute(data: CreateSubscriptionDto): Promise<Subscription> {
    await Promise.all([
      this.validatePackageExists(data.package),
      this.validateUsersExists(data.users),
    ]);

    const subscription = await this.repository.create(data);
    return subscription;
  }

  private async validatePackageExists(packageId: string): Promise<void> {
    const packageExists = await this.packageRepository.exists(packageId);

    if (!packageExists) {
      throw NotFound("Package not found");
    }
  }

  private async validateUsersExists(users: number[]): Promise<void> {
    const promises = users.map(async (id) => {
      const userExists = await this.userRepository.exists({ id });

      if (!userExists) {
        throw NotFound("User not found");
      }
    });

    await Promise.all(promises);
  }
}
