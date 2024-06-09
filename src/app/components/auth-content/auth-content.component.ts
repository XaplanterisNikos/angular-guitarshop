import { Component } from '@angular/core';
import { AxiosService } from '../../services/axios.service';

/**
 * Represents the authentication content component.
 * This component is responsible for fetching data related to authentication.
 */
@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css'
})
export class AuthContentComponent {
   /** Array to store data retrieved from the server. */
  data: string[]=[];

  /**
   * Constructs a new AuthContentComponent.
   * @param axiosService The AxiosService for making HTTP requests.
   */
  constructor(private axiosService: AxiosService){

  }

  /**
   * Lifecycle hook called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit():void{
    this.axiosService.request(
      "GET",
      "/orders",
      {}
    ).then(
      (response) => this.data = response.data // Store response data in the 'data' array
    );
  }
}
