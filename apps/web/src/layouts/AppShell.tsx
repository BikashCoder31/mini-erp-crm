import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DashboardRounded,
  Inventory2Rounded,
  LogoutRounded,
  MenuRounded,
  PeopleAltRounded,
  ReceiptLongRounded,
} from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/use-auth';

const drawerWidth = 248;
const navigation = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardRounded /> },
  { label: 'Customers', path: '/customers', icon: <PeopleAltRounded /> },
  { label: 'Products', path: '/products', icon: <Inventory2Rounded /> },
  { label: 'Challans', path: '/challans', icon: <ReceiptLongRounded /> },
];

export function AppShell() {
  const { state, logout } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (state.status !== 'authenticated') return null;

  const handleLogout = () => {
    queryClient.clear();
    logout();
  };
  const drawer = (
    <Stack sx={{ height: '100%' }}>
      <Toolbar sx={{ px: 2.5 }}>
        <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
          <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', height: 36, width: 36 }}>
            M
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 850, lineHeight: 1.1 }}>Mini ERP</Typography>
            <Typography color="text.secondary" variant="caption">
              CRM Operations
            </Typography>
          </Box>
        </Stack>
      </Toolbar>
      <Divider />
      <List aria-label="Primary navigation" sx={{ p: 1.5 }}>
        {navigation.map((item) => {
          const selected =
            item.path === '/dashboard'
              ? location.pathname === '/' || location.pathname.startsWith('/dashboard')
              : location.pathname.startsWith(item.path);
          return (
            <ListItemButton
              component={Link}
              key={item.path}
              onClick={() => setMobileOpen(false)}
              selected={selected}
              sx={{ borderRadius: 1.5, mb: 0.5 }}
              to={item.path}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack spacing={1.5} sx={{ p: 2 }}>
        <Box>
          <Typography noWrap sx={{ fontWeight: 700 }}>
            {state.user.name}
          </Typography>
          <Typography color="text.secondary" noWrap variant="body2">
            {state.user.email}
          </Typography>
        </Box>
        <Chip
          color="primary"
          label={state.user.role}
          size="small"
          sx={{ alignSelf: 'flex-start' }}
        />
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        color="inherit"
        elevation={0}
        position="fixed"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="Open navigation"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuRounded />
          </IconButton>
          <Typography sx={{ flexGrow: 1, fontWeight: 750 }}>Operations workspace</Typography>
          <Tooltip title="Logout">
            <IconButton aria-label="Logout" onClick={handleLogout}>
              <LogoutRounded />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ flexShrink: { md: 0 }, width: { md: drawerWidth } }}>
        <Drawer
          onClose={() => setMobileOpen(false)}
          open={mobileOpen}
          slotProps={{ paper: { sx: { width: drawerWidth } } }}
          sx={{ display: { xs: 'block', md: 'none' } }}
          variant="temporary"
        >
          {drawer}
        </Drawer>
        <Drawer
          open
          slotProps={{ paper: { sx: { width: drawerWidth } } }}
          sx={{ display: { xs: 'none', md: 'block' } }}
          variant="permanent"
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            mx: 'auto',
            maxWidth: 1240,
            minWidth: 0,
            p: { xs: 2, sm: 3, lg: 4 },
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
