import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { SortPipe } from '../sort.pipe';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsService } from '../products.service';
import { ProductViewComponent } from '../product-view/product-view.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { Product } from '../product';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailComponent,
    SortPipe,
    FavoritesComponent,
    ProductViewComponent,
    AsyncPipe,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  selectedProduct: Product | undefined;
  products$: Observable<Product[]> | undefined;

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }

  onAdded(product: Product) {
    alert(`${product?.title} added to cart!`);
  }
}
