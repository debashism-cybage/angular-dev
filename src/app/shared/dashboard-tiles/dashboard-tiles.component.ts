import { Component } from '@angular/core';
import { DashboardTileComponent } from '../dashboard-tile/dashboard-tile.component';

@Component({
  selector: 'app-dashboard-tiles',
  standalone: true,
  imports: [DashboardTileComponent],
  template: `
    <div class="tiles-container">
      @for (tile of tiles; track tile.route) {
        <app-dashboard-tile
          [title]="tile.title"
          [route]="tile.route"
          [description]="tile.description"
          [icon]="tile.icon"
        ></app-dashboard-tile>
      }
    </div>
  `,
  styles: [`
    .tiles-container {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 24px;
      justify-content: center;
      background-color: #f5f5f5;
    }
  `]
})
export class DashboardTilesComponent {
  tiles = [
    {
      title: 'Recipes',
      route: '/recipes',
      description: 'Browse and manage your recipes',
      icon: '🍽️'
    },
    {
      title: 'Products',
      route: '/products',
      description: 'View and manage your products',
      icon: '📦'
    },
    {
      title: 'Exercises',
      route: '/exercises',
      description: 'Track and manage your exercises',
      icon: '💪'
    }
  ];
}