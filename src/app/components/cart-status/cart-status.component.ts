import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

/**
 * Represents the cart status component.
 * This component displays the total price and quantity of items in the shopping cart.
 */
@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{

  /** Total price of items in the shopping cart. */
  totalPrice : number = 0.00;

  /** Total quantity of items in the shopping cart. */
  totalQuantity: number = 0;

  /**
   * Constructs a new CartStatusComponent.
   * @param cartService The CartService for managing shopping cart data.
   */
  constructor(private cartService: CartService){}

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    this.updateCartStatus();
  }

  /**
   * Updates the cart status by subscribing to changes in cart data from the CartService.
   */
  updateCartStatus() {
   
    // cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
