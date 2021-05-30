import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.services';
import {User} from '../model/user.model';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-show-one-product',
  templateUrl: './show-one-product.component.html',
  styleUrls: ['./show-one-product.component.scss']
})
export class ShowOneProductComponent implements OnInit {

  currentUser?: User;

  productId: string | null = '';
  product: Product = { id: 1, name: 'NMD', description: 'papuci de ultima generatie', price: 100, brand: 'adidas',
    category: 'Shoes',
    size: '45', imageUrl: 'https://material.angular.io/assets/img/examples/shiba1.jpg', discount: 0};

  constructor(private route: ActivatedRoute, private productService: ProductService, private authenticationService: AuthenticationService,
              private router: Router) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.productService.getOneProduct(this.productId).subscribe((data) => this.product = data);
  }

  deleteProduct(): void{
    // @ts-ignore
    this.productService.deleteProduct(this.productId).subscribe();
    this.router.navigate(['products']);
  }

  updateProduct(): void {
    this.router.navigateByUrl(`/edit/${this.productId}`);
  }

}
