import { Event } from "./event";

export type ProductMinimumEvent = Event & {
    productSku: string;
    productName: string;
};
