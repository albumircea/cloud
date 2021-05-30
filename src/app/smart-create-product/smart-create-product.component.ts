import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SizeService} from '../../services/size.service';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';
import Category from '../model/category.model';
import Size from '../model/size.model';
import {CategoryService} from '../../services/category.service';
import Brand from '../model/brand.model';
import {BrandService} from '../../services/brand.service';
import {ProductService} from '../../services/product.services';

@Component({
  selector: 'app-smart-create-product',
  templateUrl: './smart-create-product.component.html'
})
export class SmartCreateProductComponent implements OnInit {

  productForm?: FormGroup;

  product?: Product;
  category?: Category[];
  size?: Size[];
  brand?: Brand[];

  constructor(private productService: ProductService, private categoryService: CategoryService, private sizeService: SizeService,
              private router: Router, private fb: FormBuilder, private brandService: BrandService) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.product?.name, Validators.required],
      description: [this.product?.description , Validators.required],
      category: [this.product?.category , Validators.required],
      size: [this.product?.size, Validators.required],
      brand: [this.product?.brand, Validators.required],
      price: [this.product?.price, Validators.required],
      discount: [this.product?.discount, Validators.required]
    });
    this.categoryService.getCategorys().subscribe((data) => this.category = data);
    this.sizeService.getSizes().subscribe((data) => this.size = data);
    this.brandService.getBrands().subscribe((data) => this.brand = data);
  }

  addProduct(): void{
    this.product = this.productForm?.value as Product;
    console.log(this.productForm?.value);
    this.productService.addOneProduct(this.productForm?.value);
    this.router.navigateByUrl('/');
  }

}
