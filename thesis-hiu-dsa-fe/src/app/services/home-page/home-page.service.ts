import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentLocal } from 'src/app/environments/environment';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL = environmentLocal.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }


  //ContentIndex
  getAllContentIndex(): Observable<any> {
    return this.http.get(BASIC_URL + 'content-index');
  }

  //Content
  getContentByContentIndexId(contentIndexId: any): Observable<any> {
    return this.http.get(BASIC_URL + `content/${contentIndexId}`);
  }

  // //Product
  // addProduct(productDto: any): Observable<any> {
  //   return this.http.post(BASIC_URL + 'api/customer/product', productDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  // getAllProducts(): Observable<any> {
  //   return this.http.get(BASIC_URL + 'api/customer/products', {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getAllProductsByName(name: any): Observable<any> {
  //   return this.http.get(BASIC_URL + `api/customer/products/search/${name}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getProductDetailById(productId: any): Observable<any> {
  //   return this.http.get(BASIC_URL + `api/customer/product/${productId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // deleteProduct(productId: any): Observable<any> {
  //   return this.http.delete(BASIC_URL + `api/customer/product/${productId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // //Cart
  // addToCart(productId: any): Observable<any> {
  //   const cartDto = {
  //     productId: productId,
  //     userId: UserStorageService.getUserId(),
  //   };
  //   return this.http.post(BASIC_URL + `api/customer/cart`, cartDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getCartByUserId(): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get(BASIC_URL + `api/customer/cart/${userId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  // //Coupon

  // applyCoupon(code: any): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get(BASIC_URL + `api/customer/coupon/${userId}/${code}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  // //Increase  Product Quantity
  // increaseProductQuantity(productId: any): Observable<any> {
  //   const cartDto = {
  //     productId: productId,
  //     userId: UserStorageService.getUserId(),
  //   };
  //   return this.http.post(BASIC_URL + `api/customer/addition`, cartDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // decreaseProductQuantity(productId: any): Observable<any> {
  //   const cartDto = {
  //     productId: productId,
  //     userId: UserStorageService.getUserId(),
  //   };
  //   return this.http.post(BASIC_URL + `api/customer/deduction`, cartDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // //Place Order

  // placeOrder(orderDto: any): Observable<any> {
  //   orderDto.userId = UserStorageService.getUserId();
  //   return this.http.post(BASIC_URL + `api/customer/place-order`, orderDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  // getOrdersByUserId(): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get(BASIC_URL + `api/customer/my-orders/${userId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // getOrderedProducts(orderId: number): Observable<any> {
  //   return this.http.get(
  //     BASIC_URL + `api/customer/ordered-products/${orderId}`,
  //     {
  //       headers: this.createAuthorizationHeader(),
  //     }
  //   );
  // }

  // removeProductInCart(productId: any): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.delete(
  //     BASIC_URL + `api/customer/cart/${userId}/${productId}`,
  //     {
  //       headers: this.createAuthorizationHeader(),
  //     }
  //   );
  // }

  // //END CART

  // //Review

  // giveReview(reviewDto: any): Observable<any> {
  //   return this.http.post(BASIC_URL + `api/customer/review`, reviewDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // //Wish list

  // addProductToWishList(wishListDto: any): Observable<any> {
  //   return this.http.post(BASIC_URL + `api/customer/wish-list`, wishListDto, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }
  // getAllWishListByUserId(): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get(BASIC_URL + `api/customer/wish-list/${userId}`, {
  //     headers: this.createAuthorizationHeader(),
  //   });
  // }

  // checkProductWishListInUser(productId: any): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.get(
  //     BASIC_URL + `api/customer/wish-list/${userId}/${productId}`,
  //     {
  //       headers: this.createAuthorizationHeader(),
  //     }
  //   );
  // }

  // deleteWishList(wishListId: any): Observable<any> {
  //   const userId = UserStorageService.getUserId();
  //   return this.http.delete(
  //     BASIC_URL + `api/customer/wish-list/${userId}/${wishListId}`,
  //     {
  //       headers: this.createAuthorizationHeader(),
  //     }
  //   );
  // }
}
