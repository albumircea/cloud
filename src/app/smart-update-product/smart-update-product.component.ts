import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {SizeService} from '../../services/size.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../services/brand.service';
import {Product} from '../model/product.model';
import Category from '../model/category.model';
import Size from '../model/size.model';
import Brand from '../model/brand.model';
import {ProductService} from '../../services/product.services';

@Component({
  selector: 'app-smart-update-product',
  templateUrl: './smart-update-product.component.html'
})
export class SmartUpdateProductComponent implements OnInit {

  productForm?: FormGroup;

  productId: string | null = '';

  product!: Product;
  category?: Category[];
  size?: Size[];
  brand?: Brand[];

  constructor(private productService: ProductService, private categoryService: CategoryService, private sizeService: SizeService,
              private router: Router, private fb: FormBuilder, private brandService: BrandService, private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.productService.getOneProduct(this.productId).subscribe((value) => {
      this.product = value;
      this.productForm = this.fb.group({
        name: [this.product?.name, Validators.required],
        description: [this.product?.description , Validators.required],
        category: [this.product?.category, Validators.required],
        size: [this.product?.size, Validators.required],
        brand: [this.product?.brand, Validators.required],
        price: [this.product?.price, Validators.required],
        discount: [this.product?.discount, Validators.required]
      });
    });
    this.categoryService.getCategorys().subscribe((data) => this.category = data);
    this.sizeService.getSizes().subscribe((data) => this.size = data);
    this.brandService.getBrands().subscribe((data) => this.brand = data);
  }

  editProduct(): void{
    this.product = {...this.productForm?.value, id: Number(this.productId)};
    // tslint:disable-next-line:no-non-null-assertion
    this.productService.updateProduct(this.product!);
    this.router.navigateByUrl('/products');
  }

}
