import { describe, it, expect } from "vitest";
import { InMemoryBottleRepository } from "@/src/storage/application/repositories/in-memory-bottle-repository";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";
import { AddBottleInMlUseCase } from "@/src/storage/application/use-cases/add-bottle-in-ml-use-case";

const bottleRepository = new InMemoryBottleRepository();
const sut = new AddBottleInMlUseCase(bottleRepository);

describe("Add Bottle in ml Use Case", () => {
    it("should be able to increase a bottle amount in ml", async () => {
        const bottle = Bottle.create(
            {
                sku: "123456abc",
                name: "Product Name",
                description: "Product Description",
                amount: 1000,
                minimumAmount: 750,
                capacity: 750,
            },
            "product-3",
        );
        bottleRepository.create(bottle);
        const { bottle: added } = await sut.handle({
            bottleId: "product-3",
            value: 750,
        });
        expect(added.amount).toEqual(1750);
    });
});
