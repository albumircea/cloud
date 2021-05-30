import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product.model';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.services';
import {User} from '../model/user.model';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

  productList: Product[] = [];
  currentUser: User;


  cartProducts: Product[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => this.productList = data);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    console.log(this.currentUser);
  }

  goToProduct(id: string): void{
    this.router.navigateByUrl(`/product/${id}`);
  }

  addProduct(): void {
    this.router.navigate(['/add']);
  }

  addToCart(id: string): void {
    this.productService.getOneProduct(id).subscribe((data) => {
      console.log(data);
      this.cartProducts.push(data);
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    });
  }

}
