export interface Handler<T> {
    handle(event: T): void;
}
