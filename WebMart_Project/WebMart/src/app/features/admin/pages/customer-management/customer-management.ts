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

  // من /api/admin/dashboard
  totalProducts = 0;
  totalUsers = 0;
  totalRevenue = 0;
  totalOrders = 0;

  loading = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadStats();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (response: any) => {
        this.allCustomers = response.customers || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }

  loadStats(): void {
    this.customerService.getDashboardStats().subscribe({
      next: (response: any) => {
        this.totalUsers = response.totalUsers;
        this.totalProducts = response.totalProducts;
        this.totalRevenue = response.totalRevenue;
        this.totalOrders = response.totalOrders;
        // ملحوظة: "Active Now" و "New This Month" مش موجودين في الـ API دلوقتي
        // (شوفنا الـ documentation، الـ dashboard endpoint مارجعهومش)
        // اتفقوا مع الباك اند يضيفهم، أو احسبوا "New This Month" client-side
        // من createdAt بتاعة كل كستومر لو محتاجينها فعلاً دلوقتي.
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
          c.name?.toLowerCase().includes(term) ||
          c.email?.toLowerCase().includes(term)
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
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.applyFilters();
  }

  nextPage(): void {
    this.goToPage(this.page + 1);
  }

  prevPage(): void {
    this.goToPage(this.page - 1);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalCustomers / this.pageSize));
  }

  get pageStart(): number {
    return this.totalCustomers === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min(this.page * this.pageSize, this.totalCustomers);
  }

  // لإظهار أرقام صفحات معقولة (1, 2, 3 ... last) بدل ما تظهر 429 صفحة فعلاً
  get pagesToShow(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.page;
    const maxButtons = 3;

    let start = Math.max(1, current - 1);
    let end = Math.min(total, start + maxButtons - 1);
    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}