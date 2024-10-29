import { Bottle } from "../../../enterprise/entities/bottle";

export interface BottleRepository {
    create(bottle: Bottle): Promise<object>;
    find(id: string): Promise<Bottle | null>;
    save(bottle: Bottle): Promise<object>;
}
