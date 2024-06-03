import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
[x: string]: any;

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.route.paramMap.subscribe(() =>{
      this.listProducts();
    })
    
  }

  listProducts(){

    // ckeck id id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the id param string . convert string to a number using the + symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

      // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
    data => {
      this.products = data;
    }
    )
  }
}
