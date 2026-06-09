import { Component, inject } from '@angular/core';
import { SortPipe } from '../sort.pipe';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  selectedProduct: Product | undefined;

  products = toSignal(inject(ProductsService).getProducts(), {
    initialValue: [],
  });

  onAdded() {
    alert(`${this.selectedProduct?.title} added to cart!`);
  }
}
