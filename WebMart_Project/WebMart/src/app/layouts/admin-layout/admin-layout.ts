import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from "../../shared/components/admin-sidebar/admin-sidebar";
=======
import { AdminSidebar } from './admin-sidebar';
import { RouterOutlet } from '@angular/router';

>>>>>>> origin/Abdallah
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}