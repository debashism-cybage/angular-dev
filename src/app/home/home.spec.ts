import { Home } from './home';

describe('Home', () => {
  const createHome = (userValue: any) => {
    const authService = {
      user: () => userValue,
      isAuthenticated: () => !!userValue,
    };

    return new Home(authService as any);
  };

  it('shows a guest greeting when no user is signed in', () => {
    const home = createHome(null);

    expect(home.welcomeMessage).toBe('Welcome guest');
  });

  it('uses the signed-in user display name in the greeting', () => {
    const home = createHome({ displayName: 'Jane Doe', email: 'jane@example.com' });

    expect(home.welcomeMessage).toBe('Welcome Jane Doe');
  });
});
