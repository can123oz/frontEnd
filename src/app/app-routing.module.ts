import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path:"",pathMatch:"full", component:ProductComponent
  },
  {
    path:"products", component:ProductComponent
  },
  {
    path:"products/category/:categoryId", component:ProductComponent
  },
  {
    path:"cart", component:CartDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }