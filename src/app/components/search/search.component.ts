import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../common/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  products:Product[] =[];

  constructor(private router: Router){}

  ngOnInit(): void {
    
  }

  doSearch(value: string){
    console.log(`value=${value}`);
     this.router.navigateByUrl(`/search/${value}`);
  }
}
