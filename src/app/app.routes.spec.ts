import { routes } from './app.routes';
import { authGuard } from './guards/auth.guard';

describe('app routes', () => {
  it('should protect the default home route behind authGuard', () => {
    const route = routes.find((item) => item.path === '') as any;

    expect(route).toBeTruthy();
    expect(route.path).toBe('');
    expect(Array.isArray(route.canActivate)).toBe(true);
    expect(route.canActivate).toContain(authGuard);
    expect(typeof route.loadComponent).toBe('function');
  });

  it('should register the public pages and lazy-load their components', () => {
    const publicPaths = ['login', 'signup'];

    publicPaths.forEach((path) => {
      const route = routes.find((item) => item.path === path);

      expect(route).toBeTruthy();
      expect(route?.path).toBe(path);
      expect(typeof route?.loadComponent).toBe('function');
      expect(route?.canActivate).toBeUndefined();
    });
  });

  it('should protect authenticated routes with authGuard', () => {
    const protectedPaths = ['recipes', 'products', 'exercises', 'contact-us'];

    protectedPaths.forEach((path) => {
      const route = routes.find((item) => item.path === path) as any;

      expect(route).toBeTruthy();
      expect(route.path).toBe(path);
      expect(Array.isArray(route.canActivate)).toBe(true);
      expect(route.canActivate).toContain(authGuard);
      expect(typeof route.loadComponent).toBe('function');
    });
  });

  it('should redirect unknown paths to login', () => {
    const wildcardRoute = routes.find((item) => item.path === '**') as any;

    expect(wildcardRoute).toBeTruthy();
    expect(wildcardRoute.path).toBe('**');
    expect(wildcardRoute.redirectTo).toBe('login');
  });
});
