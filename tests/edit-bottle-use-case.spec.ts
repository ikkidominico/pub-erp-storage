import { describe, it, expect } from "vitest";
import { EditBottleUseCase } from "@/src/storage/application/use-cases/edit-bottle-use-case";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";
import { InMemoryBottleRepository } from "@/src/storage/application/repositories/in-memory-bottle-repository";

const bottleRepository = new InMemoryBottleRepository();
const sut = new EditBottleUseCase(bottleRepository);

describe("Edit Bottle Use Case", () => {
    it("should be able to edit a bottle", async () => {
        const bottle = Bottle.create(
            {
                sku: "123456abc",
                name: "Product Name",
                description: "Product Description",
                amount: 1000,
                minimumAmount: 250,
                capacity: 1000,
            },
            "bottle-1",
        );
        bottleRepository.create(bottle);
        const { bottle: updated } = await sut.handle({
            bottleId: bottle.id.toString(),
            amount: 250,
            minimumAmount: 750,
            capacity: 750,
        });
        expect(updated.id.toString()).toEqual("bottle-1");
        expect(updated.amount).toEqual(250);
        expect(updated.minimumAmount).toEqual(750);
        expect(updated.capacity).toEqual(750);
    });
});
