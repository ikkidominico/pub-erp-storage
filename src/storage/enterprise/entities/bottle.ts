import { Product, ProductProperties } from './product';

export interface BottleProperties extends ProductProperties {
    capacity: number;
}

export class Bottle extends Product<BottleProperties> {
    get capacity() {
        return this._properties.capacity;
    }

    set capacity(value: number) {
        this._properties.capacity = value;
        this.touch();
    }

    get bottles() {
        return this._properties.amount / this._properties.capacity;
    }

    add(value: number) {
        this._properties.amount += value;
        this.touch();
    }

    remove(value: number) {
        this._properties.amount -= value;
        this.touch();
    }

    addBottles(value: number) {
        const bottlesInMl = value * this._properties.capacity;
        this._properties.amount += bottlesInMl;
        this.touch();
    }

    removeBottles(value: number) {
        const bottlesInMl = value * this._properties.capacity;
        this._properties.amount -= bottlesInMl;
        this.touch();
    }

    static create(properties: BottleProperties, id?: string) {
        return new Bottle(properties, id);
    }
}
