import { Product } from "../../enterprise/entities/product";
import { ProductRepository } from "../repositories/interfaces/product-repository";

export interface CreateProductUseCaseRequest {
    sku: string;
    name: string;
    description?: string;
    amount: number;
    minimumAmount: number;
}

export class CreateProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async handle({
        sku,
        name,
        description,
        amount,
        minimumAmount,
    }: CreateProductUseCaseRequest) {
        const product = Product.create({
            sku,
            name,
            description,
            amount,
            minimumAmount,
        });
        await this.productRepository.create(product);
        return {
            product,
        };
    }
}
