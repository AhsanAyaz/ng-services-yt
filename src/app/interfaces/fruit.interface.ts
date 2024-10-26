import { Fruit } from '../constants/fruit';
import { UserType } from '../constants/user-type';

export interface IFruit {
  id: number;
  name: Fruit;
  addedBy: UserType;
}
