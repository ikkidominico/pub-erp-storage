import { describe, it, expect } from "vitest";
import { InMemoryBottleRepository } from "../src/storage/application/repositories/in-memory-bottle-repository";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";
import { DeleteBottleUseCase } from "@/src/storage/application/use-cases/delete-bottle-use-case";

const bottleRepository = new InMemoryBottleRepository();
const sut = new DeleteBottleUseCase(bottleRepository);

describe("Delete Bottle Use Case", () => {
    it("should be able to delete a Bottle", async () => {
        const bottle = Bottle.create(
            {
                sku: "1092387456",
                name: "Bottle Name",
                amount: 1000,
                minimumAmount: 250,
                capacity: 1000,
            },
            "new-bottle",
        );
        bottleRepository.create(bottle);
        await sut.handle({
            bottleId: bottle.id.toString(),
        });
        const result = await bottleRepository.find(bottle.id.toString());
        expect(result?.deleted).toBeDefined();
    });
});
