import { Component, input, output, OnChanges } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

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

  constructor(private productService: ProductsService) {}

  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id()!);
  }

  addToCart() {
    this.added.emit();
  }
}
