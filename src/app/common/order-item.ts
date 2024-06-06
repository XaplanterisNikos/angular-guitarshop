import { CartItem } from './cart-item';

/**
 * Represents an item in an order, containing details such as image URL, unit price, quantity, and product ID.
 */
export class OrderItem {
  /**
   * The URL of the image associated with the order item.
   */
  imageUrl: string;

  /**
   * The unit price of the order item.
   */
  unitPrice: number;

  /**
   * The quantity of the order item.
   */
  quantity: number;

  /**
   * The unique identifier of the product associated with the order item.
   */
  productId: string;

  /**
   * Constructs an OrderItem object based on the provided CartItem.
   * @param cartItem The CartItem object from which to initialize the OrderItem properties.
   */
  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
