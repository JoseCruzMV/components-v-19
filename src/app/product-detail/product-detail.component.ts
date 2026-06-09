import { Component, input, output, OnChanges } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnChanges {
  id = input<number>();
  product$: Observable<Product> | undefined;
  added = output();
  deleted = output();

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
  ) {}

  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  changePrice(product: Product, price: string) {
    this.productService.updateProduct(product.id, Number(price)).subscribe();
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }

  addToCart() {
    this.added.emit();
  }
}
