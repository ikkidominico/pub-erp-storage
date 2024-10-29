import { describe, it, expect } from "vitest";
import { EditProductUseCase } from "@/src/storage/application/use-cases/edit-product-use-case";
import { InMemoryProductRepository } from "../src/storage/application/repositories/in-memory-product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";

const productRepository = new InMemoryProductRepository();
const sut = new EditProductUseCase(productRepository);

describe("Edit Product Use Case", () => {
    it("should be able to edit a Product", async () => {
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
        const { product: updated } = await sut.handle({
            productId: product.id.toString(),
            amount: 10,
            minimumAmount: 5,
        });
        expect(updated.id.toString()).toEqual("product-2");
        expect(updated.amount).toEqual(10);
        expect(updated.minimumAmount).toEqual(5);
    });
});
