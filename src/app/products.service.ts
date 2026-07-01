import { Injectable, inject } from '@angular/core';
import { Product } from './product';
import { Observable, map, of, tap, catchError, throwError, retry } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { APP_SETTINGS } from './app.settings';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = inject(APP_SETTINGS).apiUrl + '/products';

  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(limit?: number): Observable<Product[]> {
    if (this.products.length === 0) {
      const options = new HttpParams().set('limit', limit || 10);
      return this.http
        .get<Product[]>(this.productsUrl, { params: options })
        .pipe(
          map((products) => {
            this.products = products;
            return products;
          }),
          retry(2),
          catchError(this.handleError),
        );
    }
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find((product) => product.id === id);
    return of(product!);
  }

  addProduct(newProduct: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, newProduct).pipe(
      map((product) => {
        this.products.push(product);
        return product;
      }),
    );
  }

  updateProduct(id: number, price: number): Observable<Product> {
    return this.http
      .patch<Product>(`${this.productsUrl}/${id}`, {
        price,
      })
      .pipe(
        map((product) => {
          const index = this.products.findIndex((p) => p.id === product.id);
          this.products[index].price = product.price;
          return product;
        }),
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`).pipe(
      tap(() => {
        const index = this.products.findIndex((p) => p.id === id);
        this.products.splice(index, 1);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';
    switch (error.status) {
      case 0:
        message = 'Client error';
        break;
      case HttpStatusCode.InternalServerError:
        message = 'Server error';
        break;
      case HttpStatusCode.BadRequest:
        message = 'Request error';
        break;
      default:
        message = 'Unknown error';
    }
    console.error(message, error.error);
    return throwError(() => error);
  }
}
