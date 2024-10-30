import { BottleRepository } from "@/src/storage/application/repositories/interfaces/bottle-repository";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";

export class InMemoryBottleRepository implements BottleRepository {
    public bottles: Bottle[];

    constructor() {
        this.bottles = [];
    }

    async create(bottle: Bottle): Promise<object> {
        this.bottles.push(bottle);
        return {
            bottle,
        };
    }

    async find(id: string): Promise<Bottle | undefined> {
        const bottle = this.bottles.find(
            (bottle) => bottle.id.toString() === id,
        );
        if (!bottle) throw new Error("Bottle not found");
        return bottle;
    }

    async save(bottle: Bottle): Promise<object> {
        const index = this.bottles.findIndex((item) => item.id === bottle.id);
        this.bottles[index] = bottle;
        return this.bottles[index];
    }

    async delete(id: string): Promise<object> {
        const bottles = this.bottles.filter(
            (bottle) => bottle.id.toString() !== id,
        );
        this.bottles = bottles;
        return {
            deleted: true,
        };
    }
}
