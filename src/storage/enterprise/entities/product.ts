import { Entity } from "@/src/storage/core/entity";

export interface ProductProperties {
    sku: string;
    name: string;
    description: string;
    amount: number;
    minimumAmount: number;
}

export class Product<Type = unknown> extends Entity<ProductProperties & Type> {
    protected constructor(properties: ProductProperties & Type, id?: string) {
        super(
            {
                ...properties,
            },
            id,
        );
    }

    get sku() {
        return this._properties.sku;
    }

    set sku(value: string) {
        this._properties.sku = value;
        this.touch();
    }

    get name() {
        return this._properties.name;
    }

    set name(value: string) {
        this._properties.name = value;
        this.touch();
    }

    get description() {
        return this._properties.description;
    }

    set description(value: string) {
        this._properties.description = value;
        this.touch();
    }

    get amount() {
        return this._properties.amount;
    }

    set amount(value: number) {
        this._properties.amount = value;
        this.touch();
    }

    get minimumAmount() {
        return this._properties.minimumAmount;
    }

    set minimumAmount(value: number) {
        this._properties.minimumAmount = value;
        this.touch();
    }

    add(value: number) {
        this._properties.amount += value;
        this.touch();
    }

    remove(value: number) {
        this._properties.amount -= value;
        this.touch();
    }

    static create(properties: ProductProperties, id?: string) {
        return new Product(properties, id);
    }
}
