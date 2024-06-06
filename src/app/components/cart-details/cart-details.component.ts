import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';


/**
 * Component for displaying and managing the shopping cart details.
 */
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit {

  /**
   * Array of items in the shopping cart.
   * @type {CartItem[]}
   */
  cartItems: CartItem[] = [];

  /**
   * The total price of items in the cart.
   * @type {number}
   */
  totalPrice: number = 0;

  /**
   * The total quantity of items in the cart.
   * @type {number}
   */
  totalQuantity: number = 0;

  /**
   * Creates an instance of CartDetailsComponent.
   * @param {CartService} cartService - The service for managing cart operations.
   */
  constructor(private cartService: CartService) {}

  /**
   * Angular ngOnInit()
   */
  ngOnInit(): void {
    this.listCartDetails();
  }

  /**
   * Lists the details of the items in the cart, including total price and total quantity.
   */
  listCartDetails() {
    // get the card items
    this.cartItems = this.cartService.cartItems;
    // totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    // totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    // totals
    this.cartService.computeCartTotals();
  }

  /**
   * Increments the quantity of a cart item.
   * @param {CartItem} theCartItem - The cart item to increment.
   */
  increamentQuantity(theCartItem: CartItem){
    this.cartService.addToCart(theCartItem);
  }

  /**
   * Decrements the quantity of a cart item.
   * @param {CartItem} theCartItem - The cart item to decrement.
   */
  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  /**
   * Removes an item from the cart.
   * @param {CartItem} theCartItem - The cart item to remove.
   */
  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }
}
