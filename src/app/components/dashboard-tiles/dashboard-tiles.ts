import { Component } from '@angular/core';
import { DashboardTile } from '../dashboard-tile/dashboard-tile';

@Component({
  selector: 'app-dashboard-tiles',
  standalone: true,
  imports: [DashboardTile],
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; padding: 24px;">
      @for (tile of tiles; track tile.route) {
        <app-dashboard-tile
          [title]="tile.title"
          [description]="tile.description"
          [route]="tile.route"
          [icon]="tile.icon"
        ></app-dashboard-tile>
      }
    </div>
  `,
  styles: []
})
export class DashboardTiles {
  tiles = [
    {
      title: 'Recipes',
      description: 'Browse and manage your recipes',
      route: '/recipes',
      icon: '🍽️'
    },
    {
      title: 'Products',
      description: 'Browse and manage your products',
      route: '/products',
      icon: '🛒'
    },
    {
      title: 'Exercises',
      description: 'Browse and manage your exercises',
      route: '/exercises',
      icon: '💪'
    }
  ];
}