import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebar } from "../../shared/components/admin-sidebar/admin-sidebar";
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminSidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {}