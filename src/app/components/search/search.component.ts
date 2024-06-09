import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../common/product';

/**
 * Represents the search component.
 * This component provides functionality for searching products.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  /** Array of products to display search results. */
  products:Product[] =[];

  /**
   * Constructs a new SearchComponent.
   * @param router The Angular router for navigation.
   */
  constructor(private router: Router){}

  ngOnInit(): void {
    
  }

  /**
   * Performs a search operation based on the provided value.
   * Navigates to the search results page with the specified search value.
   * @param value The search value entered by the user.
   */
  doSearch(value: string){
    console.log(`value=${value}`);
     this.router.navigateByUrl(`/search/${value}`);
  }


}

