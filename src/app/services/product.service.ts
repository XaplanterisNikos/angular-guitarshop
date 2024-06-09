import { HttpClient } from '@angular/common/http';
import { Injectable, resolveForwardRef } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  /**
   * Example method to fetch a numeric value from the API.
   * @returns {Observable<number>} An observable containing the example value.
   */
  getExampleValue(): Observable<number> {
    return this.httpClient.get<number>('/orders');
  }

  /**
   * Fetches a specific product by its ID from the API.
   * @param {number} theProductId - The ID of the product to fetch.
   * @returns {Observable<Product>} An observable containing the product.
   */
  getProduct(theProductId: number): Observable<Product> {
    // build URL for product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  /**
   * Fetches the list of products from the API.
   * @returns {Observable<Product[]>} An observable containing the list of products.
   */

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    //  build URL based on category id ,page and size
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  /**
   * Fetches a list of products based on category ID.
   * @param {number} theCategoryId - The category ID.
   * @returns {Observable<Product[]>} An observable containing the list of products.
   */
  getProductList(theCategoryId: number): Observable<Product[]> {
    //  build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }


  /**
   * Searches for products based on a keyword.
   * @param {string} theKeyword - The keyword to search for.
   * @returns {Observable<Product[]>} An observable containing the list of products matching the keyword.
   */
  searchProducts(theKeyword: string): Observable<Product[]> {
    //  build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  /**
   * Searches for products based on a keyword with pagination.
   * @param {number} thePage - The page number.
   * @param {number} thePageSize - The page size.
   * @param {string} theKeyword - The keyword to search for.
   * @returns {Observable<GetResponseProducts>} An observable containing the paginated list of products matching the keyword.
   */
  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    //  build URL based on keyword ,page and size
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  /**
   * Fetches the list of product categories from the API.
   * @returns {Observable<ProductCategory[]>} An observable containing the list of product categories.
   */
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  
}

/**
 * Interface for the API response.
 */
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

/**
 * Interface for the product category API response.
 */
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
