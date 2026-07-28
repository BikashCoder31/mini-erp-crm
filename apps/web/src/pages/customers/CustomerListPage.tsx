import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/use-auth';
import { listCustomers } from '../../features/customers/api';

const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function CustomerListPage() {
  const { hasRole } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');
  const status = searchParams.get('status') ?? '';
  const customerType = searchParams.get('customerType') ?? '';
  const params = {
    page,
    limit,
    search: searchParams.get('search') || undefined,
    status: status || undefined,
    customerType: customerType || undefined,
  };
  const customers = useQuery({
    queryKey: ['customers', params],
    queryFn: () => listCustomers(params),
  });

  const updateParam = (name: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    if (name !== 'page') next.set('page', '1');
    setSearchParams(next);
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="h1" variant="h4">
            Customers
          </Typography>
          <Typography color="text.secondary">
            Search customer records and manage CRM follow-ups.
          </Typography>
        </Box>
        {hasRole('ADMIN', 'SALES') && (
          <Button component={Link} to="/customers/new" variant="contained">
            Add customer
          </Button>
        )}
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') updateParam('search', search.trim());
            }}
            value={search}
            sx={{ flexGrow: 1 }}
          />
          <Button onClick={() => updateParam('search', search.trim())}>Search</Button>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              onChange={(event) => updateParam('status', event.target.value)}
              value={status}
            >
              <MenuItem value="">All statuses</MenuItem>
              <MenuItem value="LEAD">Lead</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Customer type</InputLabel>
            <Select
              label="Customer type"
              onChange={(event) => updateParam('customerType', event.target.value)}
              value={customerType}
            >
              <MenuItem value="">All types</MenuItem>
              <MenuItem value="RETAIL">Retail</MenuItem>
              <MenuItem value="WHOLESALE">Wholesale</MenuItem>
              <MenuItem value="DISTRIBUTOR">Distributor</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {customers.isPending && (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
          <CircularProgress aria-label="Loading customers" />
        </Box>
      )}
      {customers.isError && (
        <Alert
          action={<Button onClick={() => void customers.refetch()}>Retry</Button>}
          severity="error"
        >
          Customers could not be loaded.
        </Alert>
      )}
      {customers.isSuccess && customers.data.data.length === 0 && (
        <Paper variant="outlined" sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6">No customers found</Typography>
          <Typography color="text.secondary">
            Adjust the filters or add the first customer.
          </Typography>
        </Paper>
      )}
      {customers.isSuccess && customers.data.data.length > 0 && (
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Next follow-up</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.data.data.map((customer) => (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>{customer.name}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {customer.businessName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{customer.mobileNumber}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {customer.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{customer.customerType}</TableCell>
                    <TableCell>
                      <Chip label={customer.status} size="small" />
                    </TableCell>
                    <TableCell>{dateTime.format(new Date(customer.followUpDate))}</TableCell>
                    <TableCell align="right">
                      <Button component={Link} to={`/customers/${customer.id}`}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={customers.data.meta.total}
            onPageChange={(_event, nextPage) => updateParam('page', String(nextPage + 1))}
            onRowsPerPageChange={(event) => updateParam('limit', event.target.value)}
            page={Math.max(0, page - 1)}
            rowsPerPage={limit}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </Paper>
      )}
    </Stack>
  );
}
