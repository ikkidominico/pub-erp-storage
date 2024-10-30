import { Bottle } from "../../../enterprise/entities/bottle";

export interface BottleRepository {
    create(bottle: Bottle): Promise<object>;
    find(id: string): Promise<Bottle | undefined>;
    save(bottle: Bottle): Promise<object>;
    delete(bottleId: string): Promise<object>;
}
