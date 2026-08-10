import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth-guard';

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
    canActivate: [AuthGuard],
    loadComponent: () => import('./recipes/recipes').then((m) => m.RecipesDashboard),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadComponent: () => import('./products/products-dashboard').then((m) => m.ProductsDashboard),
  },
  {
    path: 'exercises',
    canActivate: [AuthGuard],
    loadComponent: () => import('./exercises/exercises-dashboard').then((m) => m.ExercisesDashboard),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];