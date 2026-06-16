import { Component, input, output, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  id = input<number>();
  product$: Observable<Product> | undefined;
  price: number | undefined;

  constructor(
    private productService: ProductsService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productService.getProduct(Number(params.get('id')));
      }),
    );
  }

  changePrice(product: Product) {
    this.productService.updateProduct(product.id, this.price!).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe();
  }
}
