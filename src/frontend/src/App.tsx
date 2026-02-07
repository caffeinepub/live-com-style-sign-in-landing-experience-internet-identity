import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import LandingPage from './pages/LandingPage';
import LauncherPage from './pages/LauncherPage';
import TilePlaceholderPage from './pages/TilePlaceholderPage';
import AuthGate from './components/AuthGate';

const rootRoute = createRootRoute({
  component: () => <Outlet />
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AuthGate
});

const launcherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/launcher',
  component: LauncherPage
});

const tileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app/$tileId',
  component: TilePlaceholderPage
});

const routeTree = rootRoute.addChildren([indexRoute, launcherRoute, tileRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
