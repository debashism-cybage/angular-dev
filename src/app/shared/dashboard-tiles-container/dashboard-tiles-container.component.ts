import { Component } from '@angular/core';
import { DashboardTileComponent } from '../dashboard-tile/dashboard-tile.component';

@Component({
  selector: 'app-dashboard-tiles-container',
  standalone: true,
  imports: [DashboardTileComponent],
  template: `
    <div class="tiles-container">
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
      description: 'Browse and manage your recipe collection',
      route: '/recipes',
      icon: 'menu_book'
    },
    {
      title: 'Products',
      description: 'Track and manage your products inventory',
      route: '/products',
      icon: 'inventory_2'
    },
    {
      title: 'Exercises',
      description: 'View and manage your exercise library',
      route: '/exercises',
      icon: 'fitness_center'
    }
  ];
}