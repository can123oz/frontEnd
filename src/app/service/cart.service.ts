import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product) {
    let item = CartItems.find(c => c.product.productId === product.productId);
    if (item) {
      item.quantity += 1;
    } else {
      let newCartItem : CartItem = {
        product:product,
        quantity:1
      }
      CartItems.push(newCartItem);
    }
    console.log(CartItems);
  }


  listCart():CartItem[] {
    console.log(CartItems);
    return CartItems;
  }

  deleteCartItem(id:number) {
    let item = CartItems.find(c => c.product.productId === id);
    if (item) {
      let index = CartItems.indexOf(item);
      CartItems.splice(index,1);
    }
  }

}