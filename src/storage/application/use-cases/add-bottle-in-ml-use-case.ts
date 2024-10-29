import { BottleRepository } from '../repositories/interfaces/bottle-repository';

interface AddBottleInMlUseCaseRequest {
    bottleId: string;
    value: number;
}

export class AddBottleInMlUseCase {
    private bottleRepository: BottleRepository;

    constructor(bottleRepository: BottleRepository) {
        this.bottleRepository = bottleRepository;
    }

    async handle({ bottleId, value }: AddBottleInMlUseCaseRequest) {
        const bottle = await this.bottleRepository.find(bottleId);

        if (!bottle) throw new Error('Bottle not found.');

        bottle.add(value);

        this.bottleRepository.save(bottle);

        return {
            bottle
        };
    }
}
