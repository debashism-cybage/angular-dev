import { Component } from '@angular/core';
import { DashboardTileComponent } from '../dashboard-tile/dashboard-tile';

@Component({
  selector: 'app-dashboard-tiles',
  standalone: true,
  imports: [DashboardTileComponent],
  template: `
    <div class="dashboard-tiles">
      <app-dashboard-tile
        [icon]="tiles[0].icon"
        [title]="tiles[0].title"
        [description]="tiles[0].description"
        [route]="tiles[0].route"
      ></app-dashboard-tile>
      <app-dashboard-tile
        [icon]="tiles[1].icon"
        [title]="tiles[1].title"
        [description]="tiles[1].description"
        [route]="tiles[1].route"
      ></app-dashboard-tile>
      <app-dashboard-tile
        [icon]="tiles[2].icon"
        [title]="tiles[2].title"
        [description]="tiles[2].description"
        [route]="tiles[2].route"
      ></app-dashboard-tile>
    </div>
  `,
  styles: [`
    .dashboard-tiles {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: center;
      padding: 24px;
    }
  `]
})
export class DashboardTilesComponent {
  tiles = [
    {
      icon: '🍽️',
      title: 'Recipes',
      description: 'Browse and manage your recipes',
      route: '/recipes'
    },
    {
      icon: '📦',
      title: 'Products',
      description: 'Browse and manage your products',
      route: '/products'
    },
    {
      icon: '💪',
      title: 'Exercises',
      description: 'Browse and manage your exercises',
      route: '/exercises'
    }
  ];
}