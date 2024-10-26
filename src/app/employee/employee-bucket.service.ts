import { Injectable } from '@angular/core';
import { BucketService } from '../bucket/bucket.service';
import { IFruit } from '../interfaces/fruit.interface';
import { UserType } from '../constants/user-type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeBucketService extends BucketService {
  constructor() {
    super();
  }

  override addItem(fruit: IFruit): void {
    if (
      this.bucket().filter((item) => item.addedBy === UserType.Employee)
        .length === 5
    ) {
      alert('You can only add 5 items');
      return;
    }

    super.addItem(fruit);
  }
}
