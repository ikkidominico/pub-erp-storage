import { ProductRepository } from '../repositories/interfaces/product-repository';

interface AddProductUseCaseRequest {
    productId: string;
    value: number;
}

export class AddProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async handle({ productId, value }: AddProductUseCaseRequest) {
        const product = await this.productRepository.find(productId);

        if (!product) throw new Error('Product not found.');

        product.add(value);

        this.productRepository.save(product);

        return {
            product
        };
    }
}
