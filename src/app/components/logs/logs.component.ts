import { Component, inject } from '@angular/core';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {
  logs = inject(LogsService).getLogs();
}
