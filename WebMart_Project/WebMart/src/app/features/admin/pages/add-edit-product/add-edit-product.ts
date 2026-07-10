import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.html',
  styleUrl: './add-edit-product.scss',
})
export class AddEditProduct implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  isLoading = false;
  successMsg = '';
  errorMsg = '';

  categories = ['men', 'women', 'accessories', 'shoes', 'bags', 'watches'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    this.productForm = this.fb.group({
      name:        ['', [Validators.required]],
      description: ['', [Validators.required]],
      price:       ['', [Validators.required, Validators.min(0)]],
      stock:       ['', [Validators.required, Validators.min(0)]],
      category:    ['men', [Validators.required]],
      image:       ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode && this.productId) {
      this.adminService.getProductById(this.productId).subscribe({
        next: (res: any) => {
          const p = res.product;
          this.productForm.patchValue({
            name:        p.name,
            description: p.description,
            price:       p.price,
            stock:       p.stock,
            category:    p.category,
            image:       p.image,
          });
        },
        error: () => this.errorMsg = 'Failed to load product.'
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const data = this.productForm.value;

    const request = this.isEditMode && this.productId
      ? this.adminService.editProduct(this.productId, data)
      : this.adminService.addProduct(data);

    request.subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = this.isEditMode
          ? 'Product updated successfully!'
          : 'Product added successfully!';
        setTimeout(() => this.router.navigate(['/admin/dashboard']), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error?.message ?? 'Something went wrong.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}