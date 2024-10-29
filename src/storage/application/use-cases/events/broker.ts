import { Handler } from "./handlers/handler";
import { Event } from "./event";

export class Broker {
    static _instance: Broker;
    private topics: Map<string, Handler<Event>[]> = new Map();

    private constructor() {
        this.topics.set("product-reached-minimum-amount-event", []);
    }

    static get instance(): Broker {
        if (!Broker._instance) Broker._instance = new Broker();
        return Broker._instance;
    }

    subscribe(topic: string, handler: Handler<Event>): void {
        if (this.topics.has(topic)) {
            this.topics.get(topic)?.push(handler);
        }
        this.topics.set(topic, [handler]);
    }

    unsubscribe(topic: string, handler: Handler<Event>): void {
        if (!this.topics.has(topic)) throw new Error("Topic not found");
        const handlerIndex = this.topics
            .get(topic)
            ?.findIndex((item) => item === handler);
        this.topics.get(topic)?.splice(handlerIndex as number, 1);
    }

    unsubscribeAll(topic: string): void {
        if (!this.topics.has(topic)) throw new Error("Topic not found");
        this.topics.set(topic, []);
    }

    notify(topic: string, event: Event) {
        if (!this.topics.has(topic)) throw new Error("Topic not found");
        const handlers = this.topics.get(topic);
        if (!handlers) throw new Error("Topic handlers are undefined");
        for (const handler of handlers) {
            handler.handle(event);
        }
    }

    delete(topic: string) {
        const deleted = this.topics.delete(topic);
        if (!deleted) throw new Error("Topic not found");
    }
}
