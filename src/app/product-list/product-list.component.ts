import { Component, OnInit } from '@angular/core';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../product';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [SortPipe, RouterLink, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap((params) => {
        return this.productService.getProducts(Number(params.get('limit')));
      }),
    );
  }
}
