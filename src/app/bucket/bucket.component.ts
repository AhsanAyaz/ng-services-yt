import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Fruit } from '../constants/fruit';
import { IFruit } from '../interfaces/fruit.interface';
import { BucketService } from './bucket.service';
import { USER_TYPE } from '../constants/user-type-token';
import { UserType } from '../constants/user-type';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BucketComponent implements OnInit {
  bucketService = inject(BucketService);
  bucket = this.bucketService.bucket;
  selectedFruit: Fruit = '' as Fruit;
  fruits: string[] = Object.values(Fruit);
  userType = inject<UserType>(USER_TYPE);
  ngOnInit(): void {
    this.bucketService.loadItems();
  }

  addSelectedFruitToBucket() {
    this.bucketService.addItem({
      id: Date.now(),
      name: this.selectedFruit,
      addedBy: this.userType,
    });
  }
  deleteFromBucket(fruit: IFruit) {
    this.bucketService.removeItem(fruit);
  }
}
