import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Fruit } from '../../constants/fruit';
import { IFruit } from '../../interfaces/fruit.interface';
import { BucketService } from './bucket.service';
import { USER_TYPE } from '../../constants/user-type-token';
import { UserType } from '../../constants/user-type';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  standalone: true,
  imports: [FormsModule, NgClass],
})
export class BucketComponent implements OnInit {
  bucket: WritableSignal<IFruit[]>;
  selectedFruit: Fruit = '' as Fruit;
  fruits: string[] = Object.values(Fruit);
  userType = inject<UserType>(USER_TYPE);
  constructor(private bucketService: BucketService) {
    this.bucket = this.bucketService.bucket;
  }
  ngOnInit(): void {
    this.bucketService.loadItems();
  }

  addSelectedFruitToBucket() {
    this.bucketService.addItem(
      {
        id: Date.now(),
        name: this.selectedFruit,
        addedBy: this.userType,
      },
      this.userType
    );
  }
  deleteFromBucket(fruit: IFruit) {
    this.bucketService.removeItem(fruit, this.userType);
  }
}
