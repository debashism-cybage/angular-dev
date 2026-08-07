import { Component } from '@angular/core';
import { DashboardTileComponent } from '../dashboard-tile/dashboard-tile';

interface TileData {
  title: string;
  description: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-tiles',
  standalone: true,
  imports: [DashboardTileComponent],
  templateUrl: './dashboard-tiles.html',
  styleUrls: ['./dashboard-tiles.css']
})
export class DashboardTilesComponent {
  tiles: TileData[] = [
    {
      title: 'Recipes',
      description: 'Browse and discover delicious recipes from around the world.',
      route: '/recipes',
      icon: '🍽️'
    },
    {
      title: 'Products',
      description: 'Explore a wide range of products available for you.',
      route: '/products',
      icon: '🛒'
    },
    {
      title: 'Exercises',
      description: 'Find exercises to help you stay fit and healthy.',
      route: '/exercises',
      icon: '💪'
    }
  ];
}