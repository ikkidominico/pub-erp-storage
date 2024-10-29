import { BottleRepository } from '../repositories/interfaces/bottle-repository';

interface EditBottleUseCaseRequest {
    bottleId: string;
    amount: number;
    minimumAmount: number;
    capacity: number;
}

export class EditBottleUseCase {
    private bottleRepository: BottleRepository;

    constructor(bottleRepository: BottleRepository) {
        this.bottleRepository = bottleRepository;
    }

    async handle({
        bottleId,
        amount,
        minimumAmount,
        capacity
    }: EditBottleUseCaseRequest) {
        const bottle = await this.bottleRepository.find(bottleId);

        if (!bottle) throw new Error('Bottle not found.');

        bottle.amount = amount;
        bottle.minimumAmount = minimumAmount;
        bottle.capacity = capacity;

        this.bottleRepository.save(bottle);

        return {
            bottle
        };
    }
}
