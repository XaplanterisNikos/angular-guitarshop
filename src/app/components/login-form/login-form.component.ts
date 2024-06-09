import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Represents the login form component.
 * This component provides functionality for user login and registration.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  /** Event emitter for the login form submission event. */
  @Output() onSubmitLoginEvent = new EventEmitter();

  /** Event emitter for the registration form submission event. */
  @Output() onSubmitRegisterEvent = new EventEmitter();

  /** The user's login. */
  login: string="";

  /** The user's password. */
  password: string ="";

  /** The active tab ('login' or 'register'). Default is 'login'. */
  active: string = "login";

  /** The user's first name (for registration). */
  firstName: string = "";

  /** The user's last name (for registration). */
  lastName: string = "";
  
/** Switches to the login tab. */
	onLoginTab(): void {
		this.active = "login";
	}

  /** Switches to the registration tab. */
	onRegisterTab(): void {
		this.active = "register";
	}

/** Handles the login form submission. */
  onSubmitLogin():void{
  this.onSubmitLoginEvent.emit({"login":this.login,"password":this.password});
  }

  /** Handles the registration form submission. */
  onSubmitRegister(): void {
    this.onSubmitRegisterEvent.emit({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
  }

}
