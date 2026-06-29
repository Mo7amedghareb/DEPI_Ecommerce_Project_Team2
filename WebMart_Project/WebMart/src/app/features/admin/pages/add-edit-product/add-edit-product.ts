import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-product.html',
  styleUrl: './add-edit-product.scss'
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      stockQuantity: [0],
      category: ['Home Decor'],
      price: [0]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe({
        next: (res: any) => {
          const product = res.product ?? res;
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            stockQuantity: product.stock,
            category: product.category,
            price: product.price
          });
        },
        error: (err) => console.error('Failed to load product', err)
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const productData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      // PUT /api/admin/products/:id
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          alert('تم تحديث المنتج بنجاح');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      // POST /api/admin/products
      this.productService.addProduct(productData).subscribe({
        next: () => {
          alert('تم إضافة المنتج بنجاح');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => console.error('Add failed', err)
      });
    }
  }
saveProduct() {
  if (this.productForm.valid) {
    console.log('بيانات المنتج:', this.productForm.value);
    
  } else {
    console.log('الفورم مش كاملة، راجعي البيانات');
  }
}
}