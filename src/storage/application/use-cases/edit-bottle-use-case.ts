import { BottleRepository } from "../repositories/interfaces/bottle-repository";

interface EditBottleUseCaseRequest {
    bottleId: string;
    sku?: string;
    name?: string;
    description?: string;
    amount?: number;
    minimumAmount?: number;
    capacity?: number;
}

export class EditBottleUseCase {
    private bottleRepository: BottleRepository;

    constructor(bottleRepository: BottleRepository) {
        this.bottleRepository = bottleRepository;
    }

    async handle({
        bottleId,
        sku,
        name,
        description,
        amount,
        minimumAmount,
        capacity,
    }: EditBottleUseCaseRequest) {
        const bottle = await this.bottleRepository.find(bottleId);
        if (!bottle) throw new Error("Bottle not found");
        bottle.sku = sku ?? bottle.sku;
        bottle.name = name ?? bottle.name;
        bottle.description = description ?? bottle.description;
        bottle.amount = amount ?? bottle.amount;
        bottle.minimumAmount = minimumAmount ?? bottle.minimumAmount;
        bottle.capacity = capacity ?? bottle.capacity;
        await this.bottleRepository.save(bottle);
        return {
            bottle,
        };
    }
}
