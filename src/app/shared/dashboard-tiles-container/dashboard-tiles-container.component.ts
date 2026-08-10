import { Component } from '@angular/core';
import { DashboardTileComponent } from '../dashboard-tile/dashboard-tile.component';

@Component({
  selector: 'app-dashboard-tiles-container',
  standalone: true,
  imports: [DashboardTileComponent],
  template: `
    <div class="tiles-container">
      @for (tile of tiles; track tile.title) {
        <app-dashboard-tile
          [title]="tile.title"
          [description]="tile.description"
          [icon]="tile.icon"
          [route]="tile.route"
        ></app-dashboard-tile>
      }
    </div>
  `,
  styles: [`
    .tiles-container {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: center;
      padding: 24px;
    }
  `]
})
export class DashboardTilesContainerComponent {
  tiles = [
    {
      title: 'Recipes',
      description: 'Browse and manage your recipes',
      icon: '🍽️',
      route: '/recipes'
    },
    {
      title: 'Products',
      description: 'Browse and manage your products',
      icon: '📦',
      route: '/products'
    },
    {
      title: 'Exercises',
      description: 'Browse and manage your exercises',
      icon: '🏋️',
      route: '/exercises'
    }
  ];
}