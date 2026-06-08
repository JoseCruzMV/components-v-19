import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { favoritesFactory } from '../favorites';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  providers: [{ provide: ProductsService, useFactory: favoritesFactory(true) }],
})
export class FavoritesComponent implements OnInit {
  products$: Observable<Product[]> | undefined;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }
}
