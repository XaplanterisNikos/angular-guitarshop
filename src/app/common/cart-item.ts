import { Product } from "./product";

/**
 * Represents an item in the shopping cart.
 */

export class CartItem {

     /**
     * The ID of the product.
     */
    id :string;

    /**
     * The name of the product.
     */
    name :string;

    /**
     * The URL of the product image.
     */
    imageUrl: string;

    /**
     * The price per unit of the product.
     */
    unitPrice: number;

    /**
     * The quantity of the product in the cart.
     */
    quantity: number;

    /**
     * Creates an instance of a CartItem.
     * @param {Product} product - The product to be added to the cart.
     */

    constructor(product: Product){
        this.id = product.id!;
        this.name = product.name!;
        this.imageUrl = product.imageUrl!;
        this.unitPrice = product.unitPrice!;

        this.quantity = 1;


    }
}
