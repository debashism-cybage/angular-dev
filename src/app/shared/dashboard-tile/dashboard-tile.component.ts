import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-tile" (click)="navigate()">
      <div class="tile-icon">{{ icon }}</div>
      <div class="tile-title">{{ title }}</div>
      <div class="tile-description">{{ description }}</div>
    </div>
  `,
  styles: [`
    .dashboard-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      min-width: 160px;
      min-height: 160px;
    }
    .dashboard-tile:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    .tile-icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
    }
    .tile-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333333;
      margin-bottom: 8px;
    }
    .tile-description {
      font-size: 0.875rem;
      color: #666666;
      text-align: center;
    }
  `]
})
export class DashboardTileComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() routeLink: string = '';

  constructor(private router: Router) {}

  navigate(): void {
    if (this.routeLink) {
      this.router.navigate([this.routeLink]);
    }
  }
}