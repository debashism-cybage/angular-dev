import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-tile" (click)="handleClick()">
      <div class="tile-icon">
        <span class="icon">{{ icon }}</span>
      </div>
      <div class="tile-content">
        <h3 class="tile-title">{{ title }}</h3>
        <p class="tile-description">{{ description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      cursor: pointer;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      min-width: 160px;
      min-height: 160px;
      text-align: center;
    }

    .dashboard-tile:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .tile-icon {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .icon {
      display: block;
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tile-title {
      font-size: 18px;
      font-weight: 600;
      color: #212121;
      margin: 0 0 6px 0;
    }

    .tile-description {
      font-size: 14px;
      color: #616161;
      margin: 0;
    }
  `]
})
export class DashboardTileComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = '';
  @Input() icon: string = '';

  constructor(private router: Router) {}

  handleClick(): void {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}