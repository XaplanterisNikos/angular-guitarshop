// src/app/login/login.component.ts
import { Component, Input } from '@angular/core';

/**
 * Represents the login component.
 * This component handles the login functionality of the application.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent  {

  /** The storage mechanism to use (sessionStorage or localStorage). */
  storage: Storage = sessionStorage;
 

  constructor(
    
  ) { }

  ngOnInit(): void {
    
  }

 
  
}
