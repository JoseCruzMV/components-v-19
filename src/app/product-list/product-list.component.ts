import { Component, OnInit } from '@angular/core';
import { SortPipe } from '../sort.pipe';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.route.data.pipe(
      switchMap((data) => of(data['products'])),
    );
  }
}
