import {Product} from './product.model';

export class Order {
  id?: number;
  email?: string;
  dateAdded?: string;
  total_cost?: number;
  product?: Product[];
}

