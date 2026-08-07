import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup').then((m) => m.Signup),
  },
  {
    path: 'recipes',
    canActivate: [authGuard],
    loadComponent: () => import('./recipes/recipes').then((m) => m.RecipesComponent),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./products/products').then((m) => m.ProductsComponent),
  },
  {
    path: 'exercises',
    canActivate: [authGuard],
    loadComponent: () => import('./exercises/exercises').then((m) => m.Exercises),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];