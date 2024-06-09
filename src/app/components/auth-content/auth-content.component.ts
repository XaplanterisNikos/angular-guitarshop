import { Component } from '@angular/core';
import { AxiosService } from '../../services/axios.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css'
})
export class AuthContentComponent {
  data: string[]=[];

  constructor(private axiosService: AxiosService){

  }

  ngOnInit():void{
    this.axiosService.request(
      "GET",
      "/orders",
      {}
    ).then(
      (response) => this.data = response.data
    );
  }
}
