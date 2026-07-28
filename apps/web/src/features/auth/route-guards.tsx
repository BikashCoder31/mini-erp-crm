import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { UserRole } from './auth-types';
import { useAuth } from './use-auth';

function safeReturnPath(path: string | null): string {
  return path?.startsWith('/') && !path.startsWith('//') ? path : '/dashboard';
}

export function RequireAuth() {
  const { state, sessionError, restoreSession } = useAuth();
  const location = useLocation();

  if (state.status === 'loading') {
    return (
      <Container sx={{ py: 10 }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress />
          <Typography>{sessionError ?? 'Checking your session...'}</Typography>
          {sessionError && <Button onClick={() => void restoreSession()}>Retry</Button>}
        </Stack>
      </Container>
    );
  }
  if (state.status === 'anonymous') {
    const returnTo = encodeURIComponent(safeReturnPath(location.pathname));
    return <Navigate to={`/login?returnTo=${returnTo}`} replace />;
  }
  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { state } = useAuth();
  if (state.status === 'loading') {
    return (
      <Box sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}>
        <CircularProgress aria-label="Checking session" />
      </Box>
    );
  }
  return state.status === 'authenticated' ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export function RequireRole({ roles }: { roles: UserRole[] }) {
  const { state } = useAuth();
  if (state.status !== 'authenticated') return <Navigate to="/login" replace />;
  return roles.includes(state.user.role) ? <Outlet /> : <Navigate to="/403" replace />;
}
