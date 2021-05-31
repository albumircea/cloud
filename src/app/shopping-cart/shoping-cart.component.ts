import { Component, OnInit } from '@angular/core';
import {Order} from '../model/order.model';
import {Product} from '../model/product.model';
import {User} from '../model/user.model';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {

  order?: Order;
  currentUser?: User;

  constructor(private authenticateService: AuthenticationService) {
    this.currentUser = this.authenticateService.currentUserValue;
    // @ts-ignore
    this.order.product = [];
  } 

  translateList(list: any): Product[] {
    let temp : Product[] = []
    temp = JSON.parse(list).map((res) => console.log(res));
    console.log(temp);
    return temp;
  }

  ngOnInit(): void {
    const temp = this.translateList(localStorage.getItem('cartProducts'));
    // @ts-ignore
    this.order.email = this.currentUser.email;
    // @ts-ignore
    this.order.totalCost = this.totalCost();
  }

  totalCost(): number{
    let sum = 0;
    // @ts-ignore
    this.order.product.map((product) => sum = sum + product.price);
    return sum;
  }

}
