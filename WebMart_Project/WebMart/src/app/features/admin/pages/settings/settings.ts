import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  profile = {
    name: '',
    email: '',
    bio: 'Digital curator specializing in high-end lifestyle goods and minimalist ecommerce architecture.',
  };

  saveSuccess = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.profile.name  = user.name  ?? '';
      this.profile.email = user.email ?? '';
    }
  }

  saveSettings(): void {
    const user = this.authService.getUser();
    if (user) {
      user.name = this.profile.name;
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.saveSuccess = true;
    setTimeout(() => this.saveSuccess = false, 2500);
  }

  discardChanges(): void {
    this.ngOnInit();
  }

  signOutAll(): void {
    this.authService.logout();
    this.router.navigate(['/admin/sign-in']);
  }
}