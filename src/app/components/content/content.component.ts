import { Component } from '@angular/core';
import { AxiosService } from '../../services/axios.service';


/**
 * Represents the content component.
 * This component manages the content displayed in the application based on user actions.
 */
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

/** Name of the component to display. Default is 'welcome'. */
  componentToShow: string = "welcome";

  
/**
   * Constructs a new ContentComponent.
   * @param axiosService The AxiosService for making HTTP requests.
   */
  constructor(private axiosService : AxiosService,
				){}

				/**
   * Lifecycle hook called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnit():void{
	
  }

  /**
   * Changes the component to be displayed.
   * @param componentToShow Name of the component to display.
   */
  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  /**
   * Handles the login action.
   * @param input An object containing login credentials.
   */
  onLogin(input:any):void{
      this.axiosService.request(
        "POST",
        "/login",
        {login: input.login,
          password: input.password
        }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);// Set authentication token
		        this.componentToShow = "orders";// Switch to 'orders' component
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);// Clear authentication token
		        this.componentToShow = "welcome";// Switch to 'welcome' component
		    }
      );
  }

  /**
   * Handles the registration action.
   * @param input An object containing user registration information.
   */
  onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    })
        .then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token); // Set authentication token
		        this.componentToShow = "orders";// Switch to 'orders' component
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);// Clear authentication token
		        this.componentToShow = "welcome";// Switch to 'welcome' component
		    }
		);
	}
}
