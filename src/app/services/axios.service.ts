import { Injectable } from '@angular/core';
import axios from 'axios';


/**
 * Service responsible for making HTTP requests using Axios library.
 * @Injectable decorator makes this service injectable across the application.
 */
@Injectable({
  providedIn: 'root' // Configures Angular to provide this service at the root level
})
export class AxiosService {

   /**
   * Constructs a new AxiosService.
   */
  constructor() { 
    // Configure default Axios settings
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.headers.post["Content-Type"] = "application/json"
  }

  /**
   * Retrieves the authentication token from local storage.
   * @returns The authentication token if exists, otherwise null.
   */
  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  /**
   * Sets the authentication token in local storage.
   * @param token The authentication token to set, or null to remove the token.
   */
  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  /**
   * Makes an HTTP request using Axios library.
   * @param method The HTTP method (e.g., GET, POST).
   * @param url The URL to send the request.
   * @param data The data to be sent with the request (optional).
   * @returns A Promise that resolves with the response data or rejects with an error.
   */
  request(method: string , url:string , data:any): Promise<any>{
    let headers: any = {};

    // Attach authorization header if authentication token is available
      if (this.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.getAuthToken()};
      }
       // Make the HTTP request using Axios
    return axios({
      method:method,
      url:url,
      data:data,
      headers:headers
    });
  }
}
