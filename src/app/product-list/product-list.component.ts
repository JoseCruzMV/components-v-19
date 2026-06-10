import { Component, inject } from '@angular/core';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [SortPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products = toSignal(inject(ProductsService).getProducts(), {
    initialValue: [],
  });
}
