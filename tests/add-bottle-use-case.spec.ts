import { describe, it, expect } from "vitest";
import { AddBottleUseCase } from "@/src/storage/application/use-cases/add-bottle-use-case";
import { InMemoryBottleRepository } from "@/src/storage/application/repositories/in-memory-bottle-repository";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";

const bottleRepository = new InMemoryBottleRepository();
const sut = new AddBottleUseCase(bottleRepository);

describe("Add Bottle Use Case", () => {
    it("should be able to increase a bottle amount", async () => {
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
            value: 5,
        });
        expect(added.amount).toEqual(4750);
    });
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
            "product-4",
        );
        bottleRepository.create(bottle);
        const { bottle: added } = await sut.handle({
            bottleId: "product-4",
            value: 1500,
            unit: "ml",
        });
        expect(added.amount).toEqual(2500);
        expect(added.bottles).toBeGreaterThan(3);
    });
});
