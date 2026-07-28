import { createBrowserRouter } from 'react-router-dom';
import { RouteHydrationFallback } from '../components/RouteHydrationFallback';
import { PublicOnlyRoute, RequireAuth, RequireRole } from '../features/auth/route-guards';
import { AppShell } from '../layouts/AppShell';

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    hydrateFallbackElement: <RouteHydrationFallback />,
    children: [
      {
        path: '/login',
        lazy: async () => ({
          Component: (await import('../pages/LoginPage')).LoginPage,
        }),
      },
    ],
  },
  {
    element: <RequireAuth />,
    hydrateFallbackElement: <RouteHydrationFallback />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: '/',
            lazy: async () => ({
              Component: (await import('../pages/DashboardPage')).DashboardPage,
            }),
          },
          {
            path: '/dashboard',
            lazy: async () => ({
              Component: (await import('../pages/DashboardPage')).DashboardPage,
            }),
          },
          {
            path: '/403',
            lazy: async () => ({
              Component: (await import('../pages/ForbiddenPage')).ForbiddenPage,
            }),
          },
          {
            path: '/customers',
            lazy: async () => ({
              Component: (await import('../pages/customers/CustomerListPage')).CustomerListPage,
            }),
          },
          {
            path: '/customers/:id',
            lazy: async () => ({
              Component: (await import('../pages/customers/CustomerDetailPage')).CustomerDetailPage,
            }),
          },
          {
            path: '/products',
            lazy: async () => ({
              Component: (await import('../pages/products/ProductListPage')).ProductListPage,
            }),
          },
          {
            path: '/products/:id',
            lazy: async () => ({
              Component: (await import('../pages/products/ProductDetailPage')).ProductDetailPage,
            }),
          },
          {
            path: '/challans',
            lazy: async () => ({
              Component: (await import('../pages/challans/ChallanListPage')).ChallanListPage,
            }),
          },
          {
            path: '/challans/:id',
            lazy: async () => ({
              Component: (await import('../pages/challans/ChallanDetailPage')).ChallanDetailPage,
            }),
          },
          {
            element: <RequireRole roles={['ADMIN', 'SALES']} />,
            children: [
              {
                path: '/customers/new',
                lazy: async () => ({
                  Component: (await import('../pages/customers/CustomerFormPage')).CustomerFormPage,
                }),
              },
              {
                path: '/customers/:id/edit',
                lazy: async () => ({
                  Component: (await import('../pages/customers/CustomerFormPage')).CustomerFormPage,
                }),
              },
              {
                path: '/challans/new',
                lazy: async () => ({
                  Component: (await import('../pages/challans/ChallanFormPage')).ChallanFormPage,
                }),
              },
              {
                path: '/challans/:id/edit',
                lazy: async () => ({
                  Component: (await import('../pages/challans/ChallanFormPage')).ChallanFormPage,
                }),
              },
            ],
          },
          {
            element: <RequireRole roles={['ADMIN', 'WAREHOUSE']} />,
            children: [
              {
                path: '/products/new',
                lazy: async () => ({
                  Component: (await import('../pages/products/ProductFormPage')).ProductFormPage,
                }),
              },
              {
                path: '/products/:id/edit',
                lazy: async () => ({
                  Component: (await import('../pages/products/ProductFormPage')).ProductFormPage,
                }),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    hydrateFallbackElement: <RouteHydrationFallback />,
    lazy: async () => ({
      Component: (await import('../pages/NotFoundPage')).NotFoundPage,
    }),
  },
]);
