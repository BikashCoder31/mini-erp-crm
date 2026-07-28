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
import { listChallans } from '../../features/challans/api';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'NPR',
});
const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function ChallanListPage() {
  const { hasRole } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');
  const status = searchParams.get('status') ?? '';
  const params = {
    page,
    limit,
    search: searchParams.get('search') || undefined,
    status: status || undefined,
  };
  const challans = useQuery({
    queryKey: ['challans', params],
    queryFn: () => listChallans(params),
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
            Sales challans
          </Typography>
          <Typography color="text.secondary">
            Prepare Drafts, confirm stock allocation, and review lifecycle history.
          </Typography>
        </Box>
        {hasRole('ADMIN', 'SALES') && (
          <Button component={Link} to="/challans/new" variant="contained">
            New challan
          </Button>
        )}
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Search number or customer"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') updateParam('search', search.trim());
            }}
            sx={{ flexGrow: 1 }}
            value={search}
          />
          <Button onClick={() => updateParam('search', search.trim())}>Search</Button>
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              onChange={(event) => updateParam('status', event.target.value)}
              value={status}
            >
              <MenuItem value="">All statuses</MenuItem>
              <MenuItem value="DRAFT">Draft</MenuItem>
              <MenuItem value="CONFIRMED">Confirmed</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {challans.isPending && (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
          <CircularProgress aria-label="Loading challans" />
        </Box>
      )}
      {challans.isError && (
        <Alert
          action={<Button onClick={() => void challans.refetch()}>Retry</Button>}
          severity="error"
        >
          Challans could not be loaded.
        </Alert>
      )}
      {challans.isSuccess && challans.data.data.length === 0 && (
        <Paper variant="outlined" sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6">No challans found</Typography>
          <Typography color="text.secondary">
            Adjust the filters or prepare the first Draft.
          </Typography>
        </Paper>
      )}
      {challans.isSuccess && challans.data.data.length > 0 && (
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Challan</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    Lines / quantity
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Total</TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Created</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {challans.data.data.map((challan) => (
                  <TableRow hover key={challan.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>{challan.challanNumber}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{challan.customer.name}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {challan.customer.businessName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={challan.status} size="small" />
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {challan.itemCount} / {challan.totalQuantity}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {money.format(Number(challan.totalAmount))}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                      <Typography variant="body2">{challan.createdBy.name}</Typography>
                      <Typography color="text.secondary" variant="caption">
                        {dateTime.format(new Date(challan.createdAt))}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button component={Link} to={`/challans/${challan.id}`}>
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
            count={challans.data.meta.total}
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
