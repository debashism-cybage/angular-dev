import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard-tile" (click)="navigate()">
      <div class="tile-icon">
        <span class="material-icon">{{ icon }}</span>
      </div>
      <div class="tile-content">
        <h3 class="tile-title">{{ title }}</h3>
        <p class="tile-description">{{ description }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard-tile.css']
})
export class DashboardTileComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = '';

  constructor(private router: Router) {}

  navigate(): void {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}