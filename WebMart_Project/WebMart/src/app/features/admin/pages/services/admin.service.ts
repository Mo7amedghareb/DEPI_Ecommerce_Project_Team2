import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private api: ApiService) {}

  getDashboardStats() {
    return this.api.get<any>('/admin/dashboard', true);
  }
}