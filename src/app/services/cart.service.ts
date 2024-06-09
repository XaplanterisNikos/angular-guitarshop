import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /** Array to hold cart items */
  cartItems: CartItem[] =[];

/** Subject to publish total price changes */
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  /** Subject to publish total quantity changes */
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  //storage:Storage = sessionStorage;
  storage:Storage = localStorage;

  constructor() { 

    // read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

      if(data != null){
        this.cartItems = data;
      }

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
  }

  /**
   * Adds an item to the cart.
   * @param {CartItem} theCartItem - The cart item to be added.
   */
  addToCart(theCartItem: CartItem){

    // already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0 ){
        // find the item from id
        existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id)!;
    }

    
    
    // check if found
    alreadyExistsInCart = (existingCartItem != undefined)
    if(alreadyExistsInCart){
      // increament the quantity
      existingCartItem.quantity++;
    }else {
      // add item
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  /**
   * Decrements the quantity of a cart item.
   * @param {CartItem} theCartItem - The cart item to decrement.
   */
  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }

  /**
   * Removes a cart item from the cart.
   * @param {CartItem} theCartItem - The cart item to remove.
   */
  remove(theCartItem: CartItem) {
    // get index
    const itemIndex = this.cartItems.findIndex(
                                tempCartItem => tempCartItem.id == theCartItem.id);
    // found id
    if(itemIndex >-1){
      this.cartItems.splice(itemIndex,1);

      this.computeCartTotals();
    }
  }

  /**
   * Computes the total price and total quantity of items in the cart.
   */
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data
    this.logCartData(totalPriceValue,totalQuantityValue);

    // persist cart data
    this.persistCartItems();
  }

  persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }


  /**
   * Logs cart data to the console.
   * @param {number} totalPriceValue - The total price of items in the cart.
   * @param {number} totalQuantityValue - The total quantity of items in the cart.
   */
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the Cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name:${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice} subTotalPrice=${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity:${totalQuantityValue}`)
    console.log('------')
  }
}
