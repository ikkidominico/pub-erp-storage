import { ProductRepository } from "@/src/storage/application/repositories/interfaces/product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";

export class InMemoryProductRepository implements ProductRepository {
    public products: Product[];

    constructor() {
        this.products = [];
    }

    async create(product: Product): Promise<object> {
        this.products.push(product);
        return {
            product,
        };
    }

    async find(id: string): Promise<Product | undefined> {
        const product = this.products.find(
            (product) => product.id.toString() === id,
        );
        if (!product) throw new Error("Product not found");
        return product;
    }

    async save(product: Product): Promise<object> {
        const index = this.products.findIndex((item) => item.id === product.id);
        this.products[index] = product;
        return this.products[index];
    }

    async delete(id: string): Promise<object> {
        const products = this.products.filter(
            (product) => product.id.toString() !== id,
        );
        this.products = products;
        return {
            deleted: true,
        };
    }
}
