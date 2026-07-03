import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  searchQuery = '';
  activeCategory = '';

  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(() => {
      const params = this.route.snapshot.queryParams;
      this.activeCategory = params['category'] || '';
      this.searchQuery = params['search'] || '';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateToCategory(category: string): void {
    this.activeCategory = category;
    this.router.navigate(['/'], { queryParams: { category } }).then(() => {
      setTimeout(() => {
        const el = document.getElementById('featured');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  }

  onSearch(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.searchQuery.trim()) {
      this.activeCategory = '';
      this.router.navigate(['/'], {
        queryParams: { search: this.searchQuery.trim() }
      }).then(() => {
        setTimeout(() => {
          const el = document.getElementById('featured');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}