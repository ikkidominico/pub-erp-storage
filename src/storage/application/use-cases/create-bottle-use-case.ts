import { Bottle } from "../../enterprise/entities/bottle";
import { BottleRepository } from "../repositories/interfaces/bottle-repository";
import { CreateProductUseCaseRequest } from "./create-product-use-case";

interface CreateBottleUseCaseRequest extends CreateProductUseCaseRequest {
    capacity: number;
}

export class CreateBottleUseCase {
    private bottleRepository: BottleRepository;

    constructor(bottleRepository: BottleRepository) {
        this.bottleRepository = bottleRepository;
    }

    async handle({
        sku,
        name,
        description,
        amount,
        minimumAmount,
        capacity,
    }: CreateBottleUseCaseRequest) {
        const bottle = Bottle.create({
            sku,
            name,
            description,
            amount,
            minimumAmount,
            capacity,
        });
        await this.bottleRepository.create(bottle);
        return {
            bottle,
        };
    }
}
