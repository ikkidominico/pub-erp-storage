import { ProductRepository } from "../repositories/interfaces/product-repository";

export interface EditProductUseCaseRequest {
    productId: string;
    sku?: string;
    name?: string;
    description?: string;
    amount?: number;
    minimumAmount?: number;
}

export class EditProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async handle({
        productId,
        sku,
        name,
        description,
        amount,
        minimumAmount,
    }: EditProductUseCaseRequest) {
        const product = await this.productRepository.find(productId);
        if (!product) throw new Error("Product not found");
        product.sku = sku ?? product.sku;
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.amount = amount ?? product.amount;
        product.minimumAmount = minimumAmount ?? product.minimumAmount;
        await this.productRepository.save(product);
        return {
            product,
        };
    }
}
