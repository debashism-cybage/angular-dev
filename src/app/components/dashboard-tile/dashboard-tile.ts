import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-tile" (click)="handleClick()">
      <div class="tile-icon">
        <span class="icon-text">{{ icon }}</span>
      </div>
      <div class="tile-content">
        <h3 class="tile-title">{{ title }}</h3>
        <p class="tile-description">{{ description }}</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --tile-bg: #ffffff;
      --tile-border: #e0e0e0;
      --tile-shadow: rgba(0, 0, 0, 0.08);
      --tile-shadow-hover: rgba(0, 0, 0, 0.15);
      --tile-title-color: #1a1a1a;
      --tile-description-color: #666666;
    }

    :host-context(.dark-mode) {
      --tile-bg: #1e1e2e;
      --tile-border: #3a3a5c;
      --tile-shadow: rgba(0, 0, 0, 0.3);
      --tile-shadow-hover: rgba(0, 0, 0, 0.5);
      --tile-title-color: #e0e0f0;
      --tile-description-color: #a0a0c0;
    }

    .dashboard-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--tile-bg);
      border: 1px solid var(--tile-border);
      border-radius: 12px;
      padding: 24px 16px;
      cursor: pointer;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      min-width: 160px;
      min-height: 160px;
      text-align: center;
      box-shadow: 0 2px 4px var(--tile-shadow);
    }

    .dashboard-tile:hover {
      box-shadow: 0 4px 12px var(--tile-shadow-hover);
      transform: translateY(-2px);
    }

    .tile-icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
      line-height: 1;
    }

    .icon-text {
      display: block;
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .tile-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--tile-title-color);
      margin: 0 0 6px 0;
    }

    .tile-description {
      font-size: 0.875rem;
      color: var(--tile-description-color);
      margin: 0;
      line-height: 1.4;
    }
  `]
})
export class DashboardTile {
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