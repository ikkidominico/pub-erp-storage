import { describe, it, expect } from "vitest";
import { InMemoryProductRepository } from "../src/storage/application/repositories/in-memory-product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";
import { DeleteProductUseCase } from "@/src/storage/application/use-cases/delete-product-use-case";

const productRepository = new InMemoryProductRepository();
const sut = new DeleteProductUseCase(productRepository);

describe("Delete Product Use Case", () => {
    it("should be able to delete a Product", async () => {
        const product = Product.create(
            {
                sku: "1092387456",
                name: "Product Name",
                amount: 10,
                minimumAmount: 2,
            },
            "new-product",
        );
        productRepository.create(product);
        await sut.handle({
            productId: product.id.toString(),
        });
        const result = await productRepository.find(product.id.toString());
        expect(result?.deleted).toBeDefined();
    });
});
