import { Component, inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BucketComponent } from '../bucket/bucket.component';
import { BucketService } from '../bucket/bucket.service';
import { USER_TYPE } from '../constants/user-type-token';
import { UserType } from '../constants/user-type';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, BucketComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [
    {
      provide: USER_TYPE,
      useValue: UserType.Admin,
    },
  ],
})
export class AdminComponent {
  injector = inject(Injector);
  bucketService = inject(BucketService);

  async performFruitAnalysis() {
    const { FruitAnalysisService } = await import('./fruit-analysis.service');
    const analysisService = this.injector.get(FruitAnalysisService);
    const bucket = this.bucketService.bucket();
    const results = analysisService.analyzeFruits(bucket);
    console.log('Fruit analysis results:', results);

    // Open the modal
    const modalCheckbox = document.getElementById(
      'fruitAnalysisModal'
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = true;
    }
  }
}
