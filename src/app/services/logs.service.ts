import { inject, Injectable } from '@angular/core';
import { USER_TYPE } from '../constants/user-type-token';
import { UserType } from '../constants/user-type';

@Injectable()
export class LogsService {
  private logs: string[] = [];

  log(message: string, userType: UserType) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${userType}]-[${timestamp}] ${message}`;
    console.log(logMessage);
    this.logs.unshift(logMessage);
  }

  getLogs(): string[] {
    return this.logs;
  }
}
