import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';


/**
 * Represents the product category menu component.
 * This component displays a menu of product categories.
 */
@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
})
export class ProductCategoryMenuComponent implements OnInit {
  /** Array of product categories. */
  productCategories: ProductCategory[] = [];

  /**
   * Constructs a new ProductCategoryMenuComponent.
   * @param productService The ProductService for managing product-related data.
   */
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProductCategories();// Load product categories when component initializes
  }

  /**
   * Retrieves the list of product categories from the ProductService.
   */
  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      console.log('Product Categories =' + JSON.stringify(data));// Log the retrieved product categories
      this.productCategories = data;// Update the productCategories array with the retrieved data
    });
  }
}
