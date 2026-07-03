import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  adminName = 'Alex';
  isLoading = true;

  stats = [
    { label: 'Total Sales', value: '0', change: '', changeType: 'positive', icon: 'fa-chart-line' },
    { label: 'Total Orders', value: '0', change: '+4.2%', changeType: 'positive', icon: 'fa-bag-shopping' },
    { label: 'Pending Orders', value: '0', change: 'Urgent', changeType: 'urgent', icon: 'fa-clock' },
    { label: 'Total Products', value: '0', change: 'Live', changeType: 'positive', icon: 'fa-box' },
  ];

  weeklyData = [
    { day: 'MON', value: 45 },
    { day: 'TUE', value: 65 },
    { day: 'WED', value: 55 },
    { day: 'THU', value: 95 },
    { day: 'FRI', value: 50 },
    { day: 'SAT', value: 70 },
    { day: 'SUN', value: 60 },
  ];

  recentOrders: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDashboardStats().subscribe({
      next: (res: any) => {
        this.stats[0].value = res.totalRevenue.toFixed(2) + ' L.E';
        this.stats[1].value = res.totalOrders.toString();
        this.stats[3].value = res.totalProducts.toString();
        this.recentOrders = res.recentOrders ?? [];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load dashboard:', err);
        this.isLoading = false;
      },
    });
  }

  get maxValue(): number {
    return Math.max(...this.weeklyData.map((d) => d.value));
  }

  barHeight(value: number): number {
    return (value / this.maxValue) * 100;
  }

  statusClass(status: string): string {
    return status?.toLowerCase() ?? '';
  }
}
