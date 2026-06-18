import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
=======
import { RouterOutlet, RouterLink } from '@angular/router';
>>>>>>> origin/Abdallah
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-user-layout',
<<<<<<< HEAD
  imports: [Navbar, RouterOutlet, Footer],
=======
  imports: [RouterOutlet, Navbar, Footer],
>>>>>>> origin/Abdallah
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {}