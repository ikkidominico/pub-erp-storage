import { ProductRepository } from "../repositories/interfaces/product-repository";

export interface DeleteProductUseCaseRequest {
    productId: string;
}

export class DeleteProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async handle({ productId }: DeleteProductUseCaseRequest) {
        const product = await this.productRepository.find(productId);
        if (!product) throw new Error("Product not found");
        product.delete();
        await this.productRepository.save(product);
        return {
            deleted: product.deleted,
        };
    }
}
