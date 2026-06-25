import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { priceMaximumValidator } from '../price-maximum.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  private distroyRef = inject(DestroyRef);
  productForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        priceMaximumValidator(1000),
      ],
    }),
    category: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor(
    private productService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productForm.controls.category.valueChanges
      .pipe(takeUntilDestroyed(this.distroyRef))
      .subscribe(() => {
        this.productForm.controls.price.reset();
      });
  }

  createProduct() {
    this.productService.addProduct(this.productForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
