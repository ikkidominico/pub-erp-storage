import { describe, beforeEach, it, expect } from "vitest";
import { CreateProductUseCase } from "@/src/storage/application/use-cases/create-product-use-case";
import { InMemoryProductRepository } from "../src/storage/application/repositories/in-memory-product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";

const productRepository = new InMemoryProductRepository();
const sut = new CreateProductUseCase(productRepository);

describe("Create Product Use Case", () => {
    beforeEach(() => {
        productRepository.products = [];
    });

    it("should be able to create a new product", async () => {
        const product = Product.create({
            sku: "123456abc",
            name: "Product Name",
            description: "Product Description",
            amount: 10,
            minimumAmount: 2,
        });
        sut.handle(product);
        expect(productRepository.products).toHaveLength(1);
    });

    it("should be able to create a new Product with determined id", async () => {
        const product = Product.create(
            {
                sku: "123456abc",
                name: "Product Name",
                description: "Product Description",
                amount: 10,
                minimumAmount: 2,
            },
            "product-1",
        );
        sut.handle(product);
        expect(product.id.toString()).toEqual("product-1");
    });
});
