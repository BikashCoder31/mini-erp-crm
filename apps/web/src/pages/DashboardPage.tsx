import {
  ArrowForwardRounded,
  Inventory2Rounded,
  PeopleAltRounded,
  ReceiptLongRounded,
} from '@mui/icons-material';
import { Alert, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { UserRole } from '../features/auth/auth-types';
import { useAuth } from '../features/auth/use-auth';

const roleDescriptions = {
  ADMIN: 'Full operational access across CRM, inventory, and sales.',
  SALES: 'Manage customer relationships and sales challans.',
  WAREHOUSE: 'Maintain product records and audited inventory balances.',
  ACCOUNTS: 'Review operational records with read-only access.',
} as const;

const workspaces: Array<{
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
  manageRoles: UserRole[];
  action: string;
}> = [
  {
    title: 'Customer CRM',
    description: 'Customer records, current follow-up dates, and activity history.',
    path: '/customers',
    icon: <PeopleAltRounded color="primary" />,
    manageRoles: ['ADMIN', 'SALES'],
    action: 'Open customers',
  },
  {
    title: 'Products & inventory',
    description: 'Product master data, stock balances, and immutable movements.',
    path: '/products',
    icon: <Inventory2Rounded color="primary" />,
    manageRoles: ['ADMIN', 'WAREHOUSE'],
    action: 'Open inventory',
  },
  {
    title: 'Sales challans',
    description: 'Draft preparation, confirmation, snapshots, and lifecycle audit.',
    path: '/challans',
    icon: <ReceiptLongRounded color="primary" />,
    manageRoles: ['ADMIN', 'SALES'],
    action: 'Open challans',
  },
];

export function DashboardPage() {
  const { state } = useAuth();
  if (state.status !== 'authenticated') return null;

  return (
    <Stack spacing={4}>
      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Box>
            <Typography component="h1" variant="h3">
              Welcome, {state.user.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {roleDescriptions[state.user.role]}
            </Typography>
          </Box>
          <Chip color="primary" label={state.user.role} />
        </Stack>
      </Box>
      <Alert severity="info">
        All stock and challan lifecycle changes are server-validated and audit-backed. Current
        balances are never edited directly.
      </Alert>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {workspaces.map((workspace) => {
          const canManage = workspace.manageRoles.includes(state.user.role);
          return (
            <Paper
              key={workspace.path}
              variant="outlined"
              sx={{ display: 'flex', flexDirection: 'column', minHeight: 230, p: 3 }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    bgcolor: 'primary.50',
                    borderRadius: 2,
                    display: 'grid',
                    p: 1.25,
                    placeItems: 'center',
                  }}
                >
                  {workspace.icon}
                </Box>
                <Chip label={canManage ? 'Manage' : 'Read only'} size="small" variant="outlined" />
              </Stack>
              <Typography component="h2" sx={{ fontWeight: 800, mt: 3 }} variant="h6">
                {workspace.title}
              </Typography>
              <Typography color="text.secondary" sx={{ flexGrow: 1, mt: 1 }}>
                {workspace.description}
              </Typography>
              <Button
                component={Link}
                endIcon={<ArrowForwardRounded />}
                sx={{ alignSelf: 'flex-start', mt: 2 }}
                to={workspace.path}
              >
                {workspace.action}
              </Button>
            </Paper>
          );
        })}
      </Box>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography component="h2" variant="h6">
          Your permission boundary
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Actions outside your role are hidden in the interface and rejected by the API if addressed
          directly.
        </Typography>
      </Paper>
    </Stack>
  );
}
