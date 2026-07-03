import { Routes } from '@angular/router';
import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  // User Pages
  {
    path: '',
    component: UserLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/pages/home/home').then(m => m.Home)
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./features/products/pages/product-details/product-details').then(m => m.ProductDetails)
      },
      {
        path: 'favourites',
        loadComponent: () =>
          import('./features/favourites/pages/favourites/favourites').then(m => m.Favourites)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/pages/cart/cart').then(m => m.Cart)
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/checkout/pages/checkout/checkout').then(m => m.Checkout)
      },
    ]
  },

  // Auth Pages
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./features/auth/pages/sign-in/sign-in').then(m => m.SignIn)
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/auth/pages/sign-up/sign-up').then(m => m.SignUp)
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/pages/forgot-password/forgot-password').then(m => m.ForgotPassword)
      },
      {
        path: 'verify-identity',
        loadComponent: () =>
          import('./features/auth/pages/verify-identity/verify-identity').then(m => m.VerifyIdentity)
      },
      {
        path: 'create-new-password',
        loadComponent: () =>
          import('./features/auth/pages/create-new-password/create-new-password').then(m => m.CreateNewPassword)
      },
    ]
  },


  {
    path: 'admin/sign-in',
    loadComponent: () =>
      import('./features/admin/pages/sign-in/sign-in').then(m => m.AdminSignIn)
  },

  // Admin Pages 
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./features/admin/pages/add-edit-product/add-edit-product').then(m => m.AddEditProduct)
      },
      {
        path: 'edit-product/:id',
        loadComponent: () =>
          import('./features/admin/pages/add-edit-product/add-edit-product').then(m => m.AddEditProduct)
      },
      {
        path: 'order-details/:id',
        loadComponent: () =>
          import('./features/admin/pages/order-details/order-details').then(m => m.OrderDetails)
      },
      {
        path: 'customer-management',
        loadComponent: () =>
          import('./features/admin/pages/customer-management/customer-management').then(m => m.CustomerManagement)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/pages/settings/settings').then(m => m.Settings)
      },
    ]
  },

  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];