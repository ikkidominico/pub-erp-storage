import { BottleRepository } from '../repositories/interfaces/bottle-repository';

interface AddBottleUseCaseRequest {
    bottleId: string;
    value: number;
}

export class AddBottleUseCase {
    private bottleRepository: BottleRepository;

    constructor(bottleRepository: BottleRepository) {
        this.bottleRepository = bottleRepository;
    }

    async handle({ bottleId, value }: AddBottleUseCaseRequest) {
        const bottle = await this.bottleRepository.find(bottleId);

        if (!bottle) throw new Error('Bottle not found.');

        bottle.addBottles(value);

        this.bottleRepository.save(bottle);

        return {
            bottle
        };
    }
}
