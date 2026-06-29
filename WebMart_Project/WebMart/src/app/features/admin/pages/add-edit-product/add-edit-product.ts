import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-product.html',
  styleUrl: './add-edit-product.scss'
})
export class AddEditProductComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      stockQuantity: [0],
      category: ['Home Decor'],
      price: [0]
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value, 'token').subscribe({
        next: (res: any) => alert('تم الحفظ'),
        error: (err: any) => console.log(err)
      });
    }
  }
}