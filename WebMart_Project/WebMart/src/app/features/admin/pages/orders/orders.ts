import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  isLoading = true;
  searchQuery = '';
  statusFilter = 'all';

  statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.adminService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orders = res.orders ?? [];
        this.filteredOrders = [...this.orders];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    let result = [...this.orders];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().replace('#', '');
      result = result.filter(o =>
        o.user?.name?.toLowerCase().includes(q) ||
        o._id.toLowerCase().includes(q) ||
        o._id.slice(-6).toLowerCase().includes(q)
      );
    }

    if (this.statusFilter !== 'all') {
      result = result.filter(o => o.status === this.statusFilter);
    }

    this.filteredOrders = result;
    this.cdr.detectChanges();
  }

  updateStatus(orderId: string, status: string): void {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        const order = this.orders.find(o => o._id === orderId);
        if (order) order.status = status;
        this.applyFilters();
      },
      error: (err) => console.error(err)
    });
  }

  deleteOrder(orderId: string): void {
    if (!confirm('Are you sure you want to delete this order?')) return;
    this.adminService.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o._id !== orderId);
        this.applyFilters();
      },
      error: (err) => console.error(err)
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  getAvatar(name: string): string {
    return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name ?? 'U') + '&background=random';
  }

  statusClass(status: string): string {
    return status?.toLowerCase() ?? '';
  }
}