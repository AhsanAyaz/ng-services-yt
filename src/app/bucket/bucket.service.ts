import { Injectable, signal } from '@angular/core';
import { IFruit } from '../interfaces/fruit.interface';
import { IBucketService } from '../interfaces/bucket-service';

@Injectable({
  providedIn: 'root',
})
export class BucketService implements IBucketService {
  bucket = signal<IFruit[]>([]);

  loadItems() {
    const bucket = JSON.parse(window.localStorage.getItem('bucket') || '[]');
    this.bucket.set(bucket);
  }

  addItem(fruit: IFruit) {
    const bucket = [fruit, ...this.bucket()];
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    this.bucket.set(bucket);
  }

  removeItem(fruit: IFruit) {
    const bucket = this.bucket().filter((item) => item.id !== fruit.id);
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    this.bucket.set(bucket);
  }
}
