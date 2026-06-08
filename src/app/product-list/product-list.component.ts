import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ProductViewComponent } from '../product-view/product-view.component';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductDetailComponent,
    SortPipe,
    FavoritesComponent,
    ProductViewComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  selectedProduct: Product | undefined;
  products: Product[] = [];

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onAdded(product: Product) {
    alert(`${product?.title} added to cart!`);
  }
}
