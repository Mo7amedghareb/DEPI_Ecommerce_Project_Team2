import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'urgent';
  icon: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  avatar: string;
  status: 'Shipped' | 'Pending' | 'Delivered';
  total: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  adminName = 'Alex';

  stats: StatCard[] = [
    { label: 'Total Sales', value: '42,850 L.E', change: '+12.5%', changeType: 'positive', icon: 'fa-chart-line' },
    { label: 'Total Orders', value: '1,240', change: '+4.2%', changeType: 'positive', icon: 'fa-bag-shopping' },
    { label: 'Pending Orders', value: '18', change: 'Urgent', changeType: 'urgent', icon: 'fa-clock' },
    { label: 'Total Products', value: '450', change: 'Live', changeType: 'positive', icon: 'fa-box' },
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

  recentOrders: RecentOrder[] = [
    { id: '#WM-9402', customer: 'Mohamed Ahmed', avatar: 'assets/images/avatars/user1.jpg', status: 'Shipped', total: 500 },
    { id: '#WM-9401', customer: 'Abdullah Alhusain', avatar: 'assets/images/avatars/user2.jpg', status: 'Pending', total: 600 },
    { id: '#WM-9401', customer: 'Abdullah Alhusain', avatar: 'assets/images/avatars/user2.jpg', status: 'Pending', total: 1200 },
    { id: '#WM-9400', customer: 'Bassant Mahmoud', avatar: 'assets/images/avatars/user3.jpg', status: 'Delivered', total: 1600 },
    { id: '#WM-9399', customer: 'Youssef Mohamed', avatar: 'assets/images/avatars/user4.jpg', status: 'Shipped', total: 3000 },
    { id: '#WM-9398', customer: 'Nour Haitham', avatar: 'assets/images/avatars/user5.jpg', status: 'Pending', total: 650 },
  ];

  get maxValue(): number {
    return Math.max(...this.weeklyData.map((d) => d.value));
  }

  barHeight(value: number): number {
    return (value / this.maxValue) * 100;
  }

  statusClass(status: string): string {
    return status.toLowerCase();
  }
}
