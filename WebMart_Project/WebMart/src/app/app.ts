import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderDetails } from './features/admin/pages/order-details/order-details';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { }