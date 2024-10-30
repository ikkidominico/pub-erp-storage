import { describe, it, expect } from "vitest";
import { InMemoryProductRepository } from "../src/storage/application/repositories/in-memory-product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";
import { RemoveProductUseCase } from "@/src/storage/application/use-cases/remove-product-use-case";
import { ProductMinimumHandler } from "@/src/storage/application/use-cases/events/handlers/product-minimum-handler";
import { Broker } from "@/src/storage/application/use-cases/events/broker";

const productRepository = new InMemoryProductRepository();
const productMinimumHandler = new ProductMinimumHandler();
const sut = new RemoveProductUseCase(productRepository);

describe("Remove Product Use Case", () => {
    it("should send a notification if product reach minimum amount", async () => {
        const product = Product.create(
            {
                sku: "123456abc",
                name: "Product Name",
                description: "Product Description",
                amount: 10,
                minimumAmount: 2,
            },
            "product-2",
        );
        productRepository.create(product);
        Broker.instance.subscribe(
            "product-minimum-amount-event",
            productMinimumHandler,
        );
        const { product: updated } = await sut.handle({
            productId: product.id.toString(),
            value: 8,
        });
        expect(updated.id.toString()).toEqual("product-2");
        expect(updated.amount).toEqual(2);
    });
});
