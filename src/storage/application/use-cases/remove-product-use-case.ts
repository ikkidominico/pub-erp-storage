import { ProductRepository } from "../repositories/interfaces/product-repository";
import { Broker } from "./events/broker";
import { ProductMinimumEvent } from "./events/product-minimum-event";

interface RemoveProductUseCaseRequest {
    productId: string;
    value: number;
}

export class RemoveProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async handle({ productId, value }: RemoveProductUseCaseRequest) {
        const product = await this.productRepository.find(productId);
        if (!product) throw new Error("Product not found");
        if (product.amount < value) throw new Error("There is no prod");
        product.remove(value);
        if (product.amount <= product.minimumAmount)
            Broker.instance.notify("product-minimum-amount-event", {
                eventCode: "E01",
                productSku: product.sku,
                productName: product.name,
                productAmount: product.amount,
            } as ProductMinimumEvent);
        this.productRepository.save(product);
        return {
            product,
        };
    }
}
