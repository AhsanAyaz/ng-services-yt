import { Component } from '@angular/core';
import { BucketComponent } from '../components/bucket/bucket.component';
import { BucketService } from '../components/bucket/bucket.service';
import { EmployeeBucketService } from './employee-bucket.service';
import { USER_TYPE } from '../constants/user-type-token';
import { UserType } from '../constants/user-type';
import { LogsComponent } from '../components/logs/logs.component';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [BucketComponent, LogsComponent],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [
    {
      provide: BucketService,
      useClass: EmployeeBucketService,
    },
    {
      provide: USER_TYPE,
      useValue: UserType.Employee,
    },
    LogsService,
  ],
})
export class EmployeeComponent {}
