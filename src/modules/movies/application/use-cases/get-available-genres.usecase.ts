import { Validate } from "../../../../shared/infrastructure/decorators/validation.decorator";
import {
  GetAvailableGenresDto,
  getAvailableGenresDtoSchema,
} from "../../infrastructure/dtos/get-available-genres.dto";
import { inject, injectable } from "inversify";
import { IUseCase } from "../../../../shared/domain/usecase";
import { Locator } from "../../shared/di.enums";
import { ISubscriptionRepository } from "../../../subscriptions/domain/repositories/subscription-repository.interface";

@injectable()
export default class GetAvailableGenresUseCase
  implements IUseCase<GetAvailableGenresDto, number[]>
{
  constructor(
    @inject(Locator.SubscriptionRepository)
    readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  @Validate(getAvailableGenresDtoSchema)
  async execute({ userId }: GetAvailableGenresDto): Promise<number[]> {
    const subscriptions = await this.subscriptionRepository.findMany({
      userId,
    });

    const availableGenres = subscriptions.flatMap((subscription) =>
      subscription.package.genres.map((genre) => genre.externalId)
    );

    return availableGenres;
  }
}
