import { Component, inject, Injector } from '@angular/core';
import { BucketComponent } from '../components/bucket/bucket.component';
import { USER_TYPE } from '../constants/user-type-token';
import { UserType } from '../constants/user-type';
import { LogsComponent } from '../components/logs/logs.component';
import { BucketService } from '../components/bucket/bucket.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [BucketComponent, LogsComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [
    {
      provide: USER_TYPE,
      useValue: UserType.Admin,
    },
    LogsService,
    BucketService,
  ],
})
export class AdminComponent {
  injector = inject(Injector);
  bucketService = inject(BucketService);
  async performFruitAnalysis() {
    const analyisServiceModule = await import(
      '../services/fruit-analysis.service'
    );
    const analysisService = this.injector.get(
      analyisServiceModule.FruitAnalysisService
    );
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
