// src/app/login/login.component.ts
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  storage: Storage = sessionStorage;
 

  constructor(
    
  ) { }

  ngOnInit(): void {
    
  }

 
  
}
