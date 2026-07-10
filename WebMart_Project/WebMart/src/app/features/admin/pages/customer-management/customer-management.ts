import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
})
export class CustomerManagement implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  isLoading = true;

  searchQuery = '';
  statusFilter = 'all';

  showAddModal = false;
  isAdding = false;
  addError = '';
  newCustomer = { name: '', email: '', password: '' };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.adminService.getCustomers().subscribe({
      next: (res: any) => {
        this.customers = res.customers ?? [];
        this.filteredCustomers = [...this.customers];
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
    let result = [...this.customers];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      );
    }

    this.filteredCustomers = result;
    this.cdr.detectChanges();
  }

  onSearch(): void {
    this.applyFilters();
  }

  deleteCustomer(customerId: string): void {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    this.adminService.deleteCustomer(customerId).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c._id !== customerId);
        this.applyFilters();
      },
      error: (err) => console.error('Failed to delete customer:', err)
    });
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.newCustomer = { name: '', email: '', password: '' };
    this.addError = '';
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  submitAddCustomer(): void {
    if (!this.newCustomer.name || !this.newCustomer.email || !this.newCustomer.password) {
      this.addError = 'All fields are required.';
      return;
    }

    this.isAdding = true;
    this.addError = '';

    this.adminService.addCustomer(this.newCustomer).subscribe({
      next: () => {
        this.isAdding = false;
        this.showAddModal = false;
        this.loadCustomers();
      },
      error: (err) => {
        this.isAdding = false;
        this.addError = err.error?.message ?? 'Failed to add customer.';
        this.cdr.detectChanges();
      }
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getAvatar(name: string): string {
    return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=random';
  }
}