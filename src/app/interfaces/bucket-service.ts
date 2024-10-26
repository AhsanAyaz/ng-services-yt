import { UserType } from '../constants/user-type';
import { IFruit } from './fruit.interface';
export interface IBucketService {
  loadItems(): void;
  addItem(fruit: IFruit, userType: UserType): void;
  removeItem(fruit: IFruit, userType: UserType): void;
}
