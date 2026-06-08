import { Injectable, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Injectable()
export class ProductViewService {
  private product: Product | undefined;
  products: Product[] = [];
  private destroyRef = inject(DestroyRef);

  constructor(private productsService: ProductsService) {
    this.productsService
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products) => {
        this.products = products;
      });
  }

  getProducts(id: number): Product | undefined {
    if (!this.product) {
      this.product = this.products.find((p) => p.id === id);
    }
    return this.product;
  }
}
