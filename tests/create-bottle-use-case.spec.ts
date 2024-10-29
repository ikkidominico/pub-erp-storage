import { describe, it, expect } from "vitest";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";
import { InMemoryBottleRepository } from "@/src/storage/application/repositories/in-memory-bottle-repository";
import { CreateBottleUseCase } from "@/src/storage/application/use-cases/create-bottle-use-case";

const bottleRepository = new InMemoryBottleRepository();
const sut = new CreateBottleUseCase(bottleRepository);

describe("Create Bottle Use Case", () => {
    it("should be able to create a new Bottle", async () => {
        const bottle = Bottle.create({
            sku: "123456abc",
            name: "Product Name",
            description: "Product Description",
            amount: 1000,
            minimumAmount: 250,
            capacity: 1000,
        });
        sut.handle(bottle);
        expect(bottleRepository.bottles).toHaveLength(1);
        expect(bottle.amount).toEqual(1000);
    });
});
