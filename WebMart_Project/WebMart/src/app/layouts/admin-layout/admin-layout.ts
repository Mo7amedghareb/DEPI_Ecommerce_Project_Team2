import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AdminSidebar } from './admin-sidebar';
import { AdminSidebar } from '../../shared/components/admin-sidebar/admin-sidebar';

import { AddEditProduct } from '../../features/admin/pages/add-edit-product/add-edit-product'; 

@Component({
  selector: 'app-admin-layout',
 
  imports: [RouterOutlet, AdminSidebar, AddEditProduct], 
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}