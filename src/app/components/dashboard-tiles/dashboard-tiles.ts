import { Component } from '@angular/core';
import { DashboardTile } from '../dashboard-tile/dashboard-tile';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-tiles',
  standalone: true,
  imports: [DashboardTile],
  styles: [`
    .tile-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: center;
      padding: 32px 16px;
    }
  `],
  template: `
    @if (authService.isAuthenticated()) {
      <div class="tile-grid">
        @for (tile of tiles; track tile.route) {
          <app-dashboard-tile
            [title]="tile.title"
            [description]="tile.description"
            [route]="tile.route"
            [icon]="tile.icon">
          </app-dashboard-tile>
        }
      </div>
    }
  `
})
export class DashboardTilesComponent {
  tiles = [
    {
      title: 'Recipes',
      description: 'Browse and manage your recipes.',
      route: '/recipes',
      icon: '🍽️'
    },
    {
      title: 'Products',
      description: 'View and manage your products.',
      route: '/products',
      icon: '📦'
    },
    {
      title: 'Exercises',
      description: 'Track and manage your exercises.',
      route: '/exercises',
      icon: '🏋️'
    }
  ];

  constructor(public authService: AuthService) {}
}