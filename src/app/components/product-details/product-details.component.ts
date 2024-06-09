import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

/**
 * Represents the product details component.
 * This component displays details of a specific product.
 */
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  /** The product to display details for. */
  product!: Product;

  /**
   * Constructs a new ProductDetailsComponent.
   * @param productService The ProductService for managing product-related data.
   * @param cartService The CartService for managing shopping cart data.
   * @param route The ActivatedRoute for accessing route parameters.
   */
  constructor(private productService: ProductService,
    private cartService: CartService,
                private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      this.handleProductDetails();// Load product details when route parameters change
    })
  }

  /**
   * Handles fetching product details from the ProductService.
   */
  handleProductDetails() {
    // get the id param string and convert string to a number using the + symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    // Fetch the product details from the ProductService
    this.productService.getProduct(theProductId).subscribe(
      data =>{
        this.product = data;// Update the product details
      }
    )
  }
  
   /**
   * Adds the current product to the shopping cart.
   */
  addToCart(){
      console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
      const theCartItem = new CartItem(this.product);// Create a new cart item from the current product
      this.cartService.addToCart(theCartItem);// Add the cart item to the shopping cart
    }
  }

