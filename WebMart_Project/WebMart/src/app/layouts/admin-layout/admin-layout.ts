import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from '../../shared/components/admin-sidebar/admin-sidebar';

import { AddEditProductComponent, AddEditProductComponent } from '../../features/admin/pages/add-edit-product/add-edit-product'; 


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminSidebar, AddEditProductComponent], 
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}