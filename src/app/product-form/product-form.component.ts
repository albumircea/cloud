import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import Size from '../model/size.model';
import Category from '../model/category.model';
import Brand from '../model/brand.model';
import {Product} from '../model/product.model';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input()
  productForm?: FormGroup;
  @Input()
  sizeList?: Size[];
  @Input()
  categoryList?: Category[];
  @Input()
  brandList?: Brand[];

  @Output()
  sendProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

}
