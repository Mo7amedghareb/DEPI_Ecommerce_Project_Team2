import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../core/services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  adminName = 'Alex';
  isLoading = true;

  stats = [
    { label: 'Total Sales', value: '0', change: '', changeType: 'positive', icon: 'fa-chart-line' },
    { label: 'Total Orders', value: '0', change: '+4.2%', changeType: 'positive', icon: 'fa-bag-shopping' },
    { label: 'Total Customers', value: '0', change: '', changeType: 'positive', icon: 'fa-users' },
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

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.adminName = user?.name ?? 'Admin';
  }

  ngOnInit() {
    this.adminService.getDashboardStats().subscribe({
      next: (res: any) => {
        // Stats
        this.stats[0].value = (res.totalRevenue ?? 0).toFixed(2) + ' L.E';
        this.stats[1].value = (res.totalOrders ?? 0).toString();
        this.stats[2].value = (res.totalUsers ?? 0).toString();
        this.stats[3].value = (res.totalProducts ?? 0).toString();

        this.recentOrders = (res.recentOrders ?? []).map((order: any) => ({
          id: order._id,
          displayId: '#' + order._id.slice(-6).toUpperCase(),
          customer: order.user?.name ?? 'Unknown',
          avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(order.user?.name ?? 'U') + '&background=random',
          status: order.status,
          total: order.totalPrice,
        }));

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load dashboard:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get maxValue(): number {
    return Math.max(...this.weeklyData.map(d => d.value));
  }

  barHeight(value: number): number {
    return (value / this.maxValue) * 100;
  }

  statusClass(status: string): string {
    return status?.toLowerCase() ?? '';
  }


  deleteOrder(orderId: string): void {
    if (!confirm('Are you sure you want to delete this order?')) return;

    this.adminService.deleteOrder(orderId).subscribe({
      next: () => {
        this.recentOrders = this.recentOrders.filter(o => o.id !== orderId);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to delete order:', err)
    });
  }
}