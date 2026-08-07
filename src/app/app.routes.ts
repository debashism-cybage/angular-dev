import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
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
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.home),
  }
  {
    path: '**',
    redirectTo: 'login',
  },
];
