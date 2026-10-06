import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { AuthService } from './services/auth.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            user: signal(null),
            isAuthenticated: signal(false),
            isLoading: signal(false),
            logout: vi.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should right-align nav links before the logout button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((style) => style.textContent ?? '')
      .join('\n');

    expect(styles).toContain('.nav-links');
    expect(styles).toContain('margin-left: auto');
    expect(styles).toContain('justify-content: flex-end');
    expect(styles).not.toContain('margin-left: auto;\n      padding: 0.5rem 1rem;\n      border: 1px solid rgba(255, 255, 255, 0.2);\n      border-radius: 0.375rem;\n      background: rgba(239, 68, 68, 0.8);\n      color: white;\n      font-size: 0.875rem;\n      font-weight: 500;\n      cursor: pointer;\n      transition: background-color 0.2s;');
  });
});
