import { BottleRepository } from "@/src/storage/application/repositories/interfaces/bottle-repository";
import { Bottle } from "@/src/storage/enterprise/entities/bottle";

export class InMemoryBottleRepository implements BottleRepository {
    public bottles: Bottle[] = [];

    async create(bottle: Bottle): Promise<object> {
        this.bottles.push(bottle);
        return {
            bottle,
        };
    }

    async find(id: string): Promise<Bottle | null> {
        const bottleIndex = this.bottles.findIndex(
            (bottle) => bottle.id.toString() === id,
        );
        return this.bottles[bottleIndex];
    }

    async save(bottle: Bottle): Promise<object> {
        const bottleIndex = this.bottles.findIndex(
            (item) => item.id === bottle.id,
        );
        this.bottles[bottleIndex] = bottle;
        return this.bottles[bottleIndex];
    }

    async delete(id: string): Promise<object> {
        const bottleIndex = this.bottles.findIndex(
            (item) => item.id.toString() === id,
        );
        const deleted = this.bottles[bottleIndex];
        this.bottles.splice(bottleIndex, 1);
        return deleted;
    }
}
