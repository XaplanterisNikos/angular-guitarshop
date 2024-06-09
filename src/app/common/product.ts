/**
 * Represents a product.
 * This class encapsulates information about a product, including its ID, SKU, name, description, price, etc.
 */
export class Product {

    /**
     * Constructs a new Product object with the specified properties.
     *
     * @param id The unique identifier for the product.
     * @param sku The stock keeping unit (SKU) of the product.
     * @param name The name of the product.
     * @param description A brief description of the product.
     * @param unitPrice The unit price of the product.
     * @param imageUrl The URL of the product image.
     * @param active Indicates whether the product is active or not.
     * @param unitsInStock The number of units of the product available in stock.
     * @param dateCreated The date when the product was created.
     * @param lastUpdated The date when the product was last updated.
     */
    constructor(public id?: string,
                public sku?: string,
                public name?: string,
                public description?: string,
                public unitPrice?: number,
                public imageUrl?: string,
                public actice?: boolean,
                public unitsInStock?: number,
                public dateCreated?: Date,
                public lastUpdated?: Date,
    ){

    }
}
