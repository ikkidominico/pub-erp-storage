import { describe, it, expect } from "vitest";
import { InMemoryProductRepository } from "../src/storage/application/repositories/in-memory-product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";
import { AddProductUseCase } from "@/src/storage/application/use-cases/add-product-use-case";

const productRepository = new InMemoryProductRepository();
const sut = new AddProductUseCase(productRepository);

describe("Add Product Use Case", () => {
    it("should be able to increase a product amount", async () => {
        const product = Product.create(
            {
                sku: "123456abc",
                name: "Product Name",
                description: "Product Description",
                amount: 10,
                minimumAmount: 2,
            },
            "product-3",
        );
        productRepository.create(product);
        const { product: added } = await sut.handle({
            productId: "product-3",
            value: 5,
        });
        expect(added.amount).toEqual(15);
    });
});
