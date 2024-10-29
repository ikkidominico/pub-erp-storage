import { Product } from "../../../enterprise/entities/product";

export interface ProductRepository {
    create(product: Product): Promise<object>;
    find(id: string): Promise<Product | null>;
    save(product: Product): Promise<object>;
}
