import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-tile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="route" style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 24px;
      text-decoration: none;
      color: #212121;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      cursor: pointer;
      min-width: 160px;
      min-height: 160px;
    "
    (mouseenter)="onMouseEnter($event)"
    (mouseleave)="onMouseLeave($event)"
    >
      <div style="font-size: 48px; margin-bottom: 12px;">{{ icon }}</div>
      <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; text-align: center;">{{ title }}</div>
      <div style="font-size: 14px; color: #616161; text-align: center;">{{ description }}</div>
    </a>
  `
})
export class DashboardTileComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = '/';

  onMouseEnter(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    el.style.transform = 'translateY(-2px)';
  }

  onMouseLeave(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
    el.style.transform = 'translateY(0)';
  }
}