import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Injectable()
export class ProductViewService {
  private product: Product | undefined;
  products: Product[] = [];

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe((products) => {
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
