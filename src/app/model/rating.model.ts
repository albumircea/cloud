import {Product} from './product.model';
import {User} from './user.model';

export default interface Rating{
  id?: number;
  product: Product;
  user: User;
  rating: number;
}
