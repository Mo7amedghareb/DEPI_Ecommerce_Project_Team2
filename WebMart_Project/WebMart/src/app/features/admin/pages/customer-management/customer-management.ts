import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../../Services/customer/customer';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
})
export class CustomerManagement implements OnInit {
  allCustomers: any[] = [];
  customers: any[] = [];

  searchTerm = '';
  statusFilter = 'all';

  page = 1;
  pageSize = 10;
  totalCustomers = 0;

  // من الداشبورد
  totalProducts = 0;
  totalUsers = 0;
  totalRevenue = 0;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadStats();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (response: any) => {
        this.allCustomers = response.customers;
        this.totalCustomers = response.count;
        this.applyFilters();
      },
      error: (error) => console.error(error),
    });
  }

  loadStats(): void {
    this.customerService.getDashboardStats().subscribe({
      next: (response: any) => {
        this.totalUsers = response.totalUsers;
        // ملحوظة: "Active Now" و "New This Month" مش موجودين في الـ API
        // محتاجين الباك اند يضيفهم في dashboard response
      },
      error: (error) => console.error(error),
    });
  }

  applyFilters(): void {
    let filtered = [...this.allCustomers];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term)
      );
    }

    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((c) => c.role === this.statusFilter);
    }

    this.totalCustomers = filtered.length;

    const start = (this.page - 1) * this.pageSize;
    this.customers = filtered.slice(start, start + this.pageSize);
  }

  onSearchChange(): void {
    this.page = 1;
    this.applyFilters();
  }

  goToPage(p: number): void {
    this.page = p;
    this.applyFilters();
  }

  get totalPages(): number {
    return Math.ceil(this.totalCustomers / this.pageSize);
  }
}