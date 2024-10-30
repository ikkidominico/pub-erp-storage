import { ProductMinimumEvent } from "../product-minimum-event";
import { Handler } from "./handler";

export class ProductMinimumHandler implements Handler<ProductMinimumEvent> {
    handle({ productName, productAmount }: ProductMinimumEvent): void {
        console.log(
            `'${productName}' current amount '${productAmount}' is lower than the minimum`,
        );
    }
}
