import { inject, Injectable, signal } from '@angular/core';
import { IFruit } from '../../interfaces/fruit.interface';
import { IBucketService } from '../../interfaces/bucket-service';
import { LogsService } from '../../services/logs.service';
import { UserType } from '../../constants/user-type';

@Injectable()
export class BucketService implements IBucketService {
  bucket = signal<IFruit[]>([]);
  logs = inject(LogsService);

  loadItems() {
    const bucket = JSON.parse(window.localStorage.getItem('bucket') || '[]');
    this.bucket.set(bucket);
  }

  addItem(fruit: IFruit, userType: UserType) {
    const bucket = [fruit, ...this.bucket()];
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    this.bucket.set(bucket);
    this.logs.log(`Item added: ${JSON.stringify(fruit)}`, userType);
  }

  removeItem(fruit: IFruit, userType: UserType) {
    const bucket = this.bucket().filter((item) => item.id !== fruit.id);
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    this.bucket.set(bucket);
    this.logs.log(`Item removed: ${JSON.stringify(fruit)}`, userType);
  }
}
