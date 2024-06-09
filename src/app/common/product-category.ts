/**
 * Represents a product category.
 * This class encapsulates information about a product category, including its ID and name.
 */
export class ProductCategory {
    /**
     * Constructs a new ProductCategory object with the specified ID and category name.
     *
     * @param id The unique identifier for the product category.
     * @param categoryName The name of the product category.
     */
    constructor(public id:number,  // The unique identifier for the product category
                public categoryName: string) {  // The name of the product category

    }
}
