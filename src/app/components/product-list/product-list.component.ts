import { Component, OnInit } from '@angular/core';

import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

/**
 * Represents the product list component.
 * This component displays a list of products.
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  // [x: string]: any;

  /** Indicates whether the component is in search mode. */
  searchMode: boolean = false;
  products: Product[] = []; //Array of products to display.
  // collectionSize: number = 0;

  currentCategoryId: number = 1;// The ID of the current category being displayed.
  previousCategoryId: number = 1;// The ID of the previous category displayed.

  // properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;
  previousKeyword: string = '';


  /**
   * Constructs a new ProductListComponent.
   * @param productService The ProductService for managing product-related data.
   * @param cartService The CartService for managing shopping cart data.
   * @param route The ActivatedRoute for accessing route parameters.
   */
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.collectionSize = this.products.length;
    this.route.paramMap.subscribe(() => {
      this.listProducts();// Load products when route parameters change
    });
  }

  /**
   * Lists products based on route parameters.
   */
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  /**
   * Handles searching for products based on a keyword.
   */
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if the keyword is different from previous set thePageNumber to 1
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword},thePageNumber=${this.thePageNumber}`);

    // search for the products
    this.productService.searchProductsPaginate(this.thePageNumber -1,this.thePageSize,theKeyword).subscribe(this.processResult());
  }

  /**
   * Handles listing products based on category.
   */
  handleListProducts() {
    // ckeck id id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the id param string . convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // check category id
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(
      `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`
    );

    // now get the products for the given category id
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }

  /**
   * Updates the number of items per page for pagination.
   * @param pageSize The new page size.
   */
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

   /**
   * Processes the search result data.
   */
  processResult(){
    return (data:any) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  /**
   * Adds a product to the shopping cart.
   * @param theProduct The product to add to the cart.
   */
  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);
    
  }
}
