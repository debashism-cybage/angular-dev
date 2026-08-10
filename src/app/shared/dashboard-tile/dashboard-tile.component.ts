import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="route" class="dashboard-tile">
      <div class="tile-icon">
        <span class="material-icon">{{ icon }}</span>
      </div>
      <div class="tile-content">
        <h3 class="tile-title">{{ title }}</h3>
        <p class="tile-description">{{ description }}</p>
      </div>
    </a>
  `,
  styles: [`
    .dashboard-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 32px 24px;
      text-decoration: none;
      color: #333333;
      transition: box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
      cursor: pointer;
      min-height: 180px;
    }

    .dashboard-tile:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
      background-color: #f5f5f5;
    }

    .tile-icon {
      font-size: 48px;
      margin-bottom: 16px;
      line-height: 1;
    }

    .material-icon {
      font-size: 48px;
    }

    .tile-content {
      text-align: center;
    }

    .tile-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #222222;
    }

    .tile-description {
      font-size: 0.95rem;
      color: #666666;
      margin: 0;
    }
  `]
})
export class DashboardTileComponent {
  @Input() title: string = '';
  @Input() route: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
}