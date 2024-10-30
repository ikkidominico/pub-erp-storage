import { BottleRepository } from "../repositories/interfaces/bottle-repository";

export interface DeleteBottleUseCaseRequest {
    bottleId: string;
}

export class DeleteBottleUseCase {
    private bottleRepository: BottleRepository;

    constructor(bottleRepository: BottleRepository) {
        this.bottleRepository = bottleRepository;
    }

    async handle({ bottleId }: DeleteBottleUseCaseRequest) {
        const bottle = await this.bottleRepository.find(bottleId);
        if (!bottle) throw new Error("Bottle not found");
        bottle.delete();
        await this.bottleRepository.save(bottle);
        return {
            deleted: bottle.deleted,
        };
    }
}
