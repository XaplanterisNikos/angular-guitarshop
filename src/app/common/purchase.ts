import { Address } from './address';
import { Customer } from './customer';
import { Order } from './order';
import { OrderItem } from './order-item';

/**
 * Represents a purchase made by a customer, including customer information,
 * shipping and billing addresses, order details, and order items.
 */
export class Purchase {
  /**
   * The customer who made the purchase.
   */
  customer!: Customer;

  /**
   * The shipping address for the purchase.
   */
  shippingAddress!: Address;

  /**
   * The billing address for the purchase.
   */
  billingAddress!: Address;

  /**
   * The overall order information for the purchase.
   */
  order!: Order;

  /**
   * The list of individual items included in the purchase order.
   */
  orderItems!: OrderItem[];
}
