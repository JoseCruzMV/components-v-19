import { Component, AfterViewInit, viewChild } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements AfterViewInit {
  products: Product[] = [
    {
      id: 1,
      title: 'Keyboard',
      price: 100,
      categories: {
        1: 'Computing',
        2: 'Peripherals',
      },
    },
    {
      id: 2,
      title: 'Microphone',
      price: 35,
      categories: { 3: 'Multimedia' },
    },
    {
      id: 3,
      title: 'Web camera',
      price: 79,
      categories: {
        1: 'Computing',
        3: 'Multimedia',
      },
    },
    {
      id: 4,
      title: 'Tablet',
      price: 500,
      categories: { 4: 'Entertainment' },
    },
  ];

  ngAfterViewInit(): void {
    console.log('Product.AfterViewInit:', this.productDetail()!.product());
  }

  productDetail = viewChild(ProductDetailComponent);

  selectedProduct: Product | undefined;

  onAdded(product: Product) {
    alert(`${product?.title} added to cart!`);
  }
}
