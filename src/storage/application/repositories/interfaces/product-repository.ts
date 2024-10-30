import { Product } from "../../../enterprise/entities/product";

export interface ProductRepository {
    create(product: Product): Promise<object>;
    find(id: string): Promise<Product | undefined>;
    save(product: Product): Promise<object>;
    delete(productId: string): Promise<object>;
}
