import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar";
import { RouterOutlet } from "@angular/router";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-user-layout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {}
