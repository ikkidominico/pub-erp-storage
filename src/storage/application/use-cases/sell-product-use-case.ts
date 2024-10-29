import { ProductRepository } from "../repositories/interfaces/product-repository";
import { Broker } from "./events/broker";
import { ProductMinimumEvent } from "./events/product-minimum-event";
import ProductMinimumHandler from "./events/handlers/product-minimum-handler";

interface SellProductUseCaseRequest {
    productId: string;
    value: number;
}

export class SellProductUseCase {
    private productRepository: ProductRepository;
    private productMinimumHandler: ProductMinimumHandler;

    constructor(
        productRepository: ProductRepository,
        productMinimumHandler: ProductMinimumHandler,
    ) {
        this.productRepository = productRepository;
        this.productMinimumHandler = productMinimumHandler;
    }

    async handle({ productId, value }: SellProductUseCaseRequest) {
        const product = await this.productRepository.find(productId);

        if (!product) throw new Error("Product not found.");

        product.remove(value);

        if (product.amount <= product.minimumAmount) {
            const event = {
                name: "product-reached-minimum-amount-event",
                productSku: product.sku,
                productName: product.name,
            } as ProductMinimumEvent;
            Broker.instance.subscribe(
                "product-reached-minimum-amount-event",
                this.productMinimumHandler,
            );
            Broker.instance.notify(
                "product-reached-minimum-amount-event",
                event,
            );
        }

        this.productRepository.save(product);

        return {
            product,
        };
    }
}
