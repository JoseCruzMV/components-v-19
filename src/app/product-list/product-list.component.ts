import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, FavoritesComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  selectedProduct: Product | undefined;
  products: Product[] = [];

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onAdded(product: Product) {
    alert(`${product?.title} added to cart!`);
  }
}
