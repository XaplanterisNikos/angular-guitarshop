import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';


/**
 * Service responsible for handling the checkout process.
 */
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  /**
   * The URL for submitting purchase information.
   */
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  /**
   * Constructs a new instance of CheckoutService.
   * @param httpClient The HttpClient service for making HTTP requests.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Sends a purchase order to the server for processing.
   * @param purchase The purchase order to be submitted.
   * @returns An Observable that emits the response from the server.
   */
  placeOrder(purchase: Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }
}
