import { ProductRepository } from "@/src/storage/application/repositories/interfaces/product-repository";
import { Product } from "@/src/storage/enterprise/entities/product";

export class InMemoryProductRepository implements ProductRepository {
    public products: Product[] = [];

    async create(product: Product): Promise<object> {
        this.products.push(product);
        return {
            product,
        };
    }

    async find(id: string): Promise<Product | null> {
        const productIndex = this.products.findIndex(
            (product) => product.id.toString() === id,
        );
        return this.products[productIndex];
    }

    async save(product: Product): Promise<object> {
        const productIndex = this.products.findIndex(
            (item) => item.id === product.id,
        );
        this.products[productIndex] = product;
        return this.products[productIndex];
    }

    async delete(id: string): Promise<object> {
        const productIndex = this.products.findIndex(
            (item) => item.id.toString() === id,
        );
        const deleted = this.products[productIndex];
        this.products.splice(productIndex, 1);
        return deleted;
    }
}
