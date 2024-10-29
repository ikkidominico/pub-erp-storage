import { ProductRepository } from '../repositories/interfaces/product-repository';

export interface EditProductUseCaseRequest {
    productId: string;
    amount: number;
    minimumAmount: number;
}

export class EditProductUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async handle({
        productId,
        amount,
        minimumAmount
    }: EditProductUseCaseRequest) {
        const product = await this.productRepository.find(productId);

        if (!product) throw new Error('Product not found.');

        product.amount = amount;
        product.minimumAmount = minimumAmount;

        this.productRepository.save(product);

        return {
            product
        };
    }
}
