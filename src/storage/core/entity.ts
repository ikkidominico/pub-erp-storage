import { UniqueEntityIdentifier } from "./unique-entity-identifier";

export abstract class Entity<Properties> {
    private _id: UniqueEntityIdentifier;
    protected _properties: Properties;
    private _createdAt: Date;
    private _updatedAt?: Date;
    private _deletedAt?: Date;

    protected constructor(properties: Properties, id?: string) {
        this._id = new UniqueEntityIdentifier(id);
        this._properties = properties;
        this._createdAt = new Date();
    }

    get id() {
        return this._id;
    }

    protected touch() {
        this._updatedAt = new Date();
    }

    protected deleted() {
        this._deletedAt = new Date();
    }
}
