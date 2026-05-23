import {
  Component,
  input,
  output,
  OnInit,
  OnDestroy,
  DestroyRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit, OnDestroy, OnChanges {
  product = input<Product>();

  added = output<Product>();

  constructor(private destroyRef: DestroyRef) {
    console.log('Product:', this.product());
    destroyRef.onDestroy(() => {
      console.log('Destroy.Constructor');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    if (!product.isFirstChange()) {
      const oldValue = product.previousValue;
      const newValue = product.currentValue;
      console.log('Old value:', oldValue);
      console.log('New value:', newValue);
    }
  }

  ngOnInit(): void {
    console.log('Product.OnInit:', this.product());
  }

  ngOnDestroy(): void {
    console.log('Product.OnDestroy:', this.product());
  }

  addToCart() {
    this.added.emit(this.product()!);
  }
}
