import { Handler } from "./handler";

export default class ProductMinimumHandler
    implements Handler<ProductMinimumHandler>
{
    handle(): void {
        console.log("Product minimum handler notified!");
    }
}
