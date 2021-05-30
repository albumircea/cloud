import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowProductComponent} from './show-product/show-product.component';
import {ShowOneProductComponent} from './show-one-product/show-one-product.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_helpers/auth.guard';
import {SmartCreateProductComponent} from './smart-create-product/smart-create-product.component';
import {SmartUpdateProductComponent} from './smart-update-product/smart-update-product.component';
import {ShopingCartComponent} from './shopping-cart/shoping-cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'products', component: ShowProductComponent, canActivate: [AuthGuard]},
  {path: 'clothing', component: ShowProductComponent, canActivate: [AuthGuard]},
  {path: 'shoes', component: ShowProductComponent},
  {path: 'product/:id', component: ShowOneProductComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'add', component: SmartCreateProductComponent},
  {path: 'edit/:id', component: SmartUpdateProductComponent},
  {path: 'shoppingCart', component: ShopingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
