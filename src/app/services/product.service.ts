import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

/**
 * Fetches the list of products from the API.
 * @returns {Observable<Product[]>} An observable containing the list of products.
 */
  getProductList(theCategoryId: number): Observable<Product[]> {

    // @TODO:  build URL based on category id

    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
  );
  }
}

/**
 * Interface for the API response.
 */
interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
