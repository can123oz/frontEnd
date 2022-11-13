import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  constructor(private cartService : CartService) { }

  CartItemForFor :  CartItem[];

  ngOnInit(): void {
    this.CartItemForFor = this.cartService.listCart();
  }

}
