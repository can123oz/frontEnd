import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[];

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartItems = this.cartService.listCart();
  }

  deleteItem(productId : number) {
    this.cartService.deleteCartItem(productId);
  }
}