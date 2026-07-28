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
import { listProducts } from '../../features/products/api';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'NPR',
});

function queryBoolean(value: string): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export function ProductListPage() {
  const { hasRole } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '20');
  const category = searchParams.get('category') ?? '';
  const warehouseLocation = searchParams.get('warehouseLocation') ?? '';
  const active = searchParams.get('isActive') ?? '';
  const lowStock = searchParams.get('lowStock') ?? '';
  const params = {
    page,
    limit,
    search: searchParams.get('search') || undefined,
    category: category || undefined,
    warehouseLocation: warehouseLocation || undefined,
    isActive: queryBoolean(active),
    lowStock: queryBoolean(lowStock),
  };
  const products = useQuery({
    queryKey: ['products', params],
    queryFn: () => listProducts(params),
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
            Products & inventory
          </Typography>
          <Typography color="text.secondary">
            Monitor stock balances and the immutable inventory ledger.
          </Typography>
        </Box>
        {hasRole('ADMIN', 'WAREHOUSE') && (
          <Button component={Link} to="/products/new" variant="contained">
            Add product
          </Button>
        )}
      </Stack>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
          <TextField
            label="Search name or SKU"
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') updateParam('search', search.trim());
            }}
            sx={{ flexGrow: 1 }}
            value={search}
          />
          <Button onClick={() => updateParam('search', search.trim())}>Search</Button>
          <TextField
            label="Category"
            onChange={(event) => updateParam('category', event.target.value)}
            value={category}
          />
          <TextField
            label="Location"
            onChange={(event) => updateParam('warehouseLocation', event.target.value)}
            value={warehouseLocation}
          />
          <FormControl sx={{ minWidth: 130 }}>
            <InputLabel>Active</InputLabel>
            <Select
              label="Active"
              onChange={(event) => updateParam('isActive', event.target.value)}
              value={active}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Stock state</InputLabel>
            <Select
              label="Stock state"
              onChange={(event) => updateParam('lowStock', event.target.value)}
              value={lowStock}
            >
              <MenuItem value="">All stock</MenuItem>
              <MenuItem value="true">Low stock</MenuItem>
              <MenuItem value="false">Above threshold</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {products.isPending && (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
          <CircularProgress aria-label="Loading products" />
        </Box>
      )}
      {products.isError && (
        <Alert
          action={<Button onClick={() => void products.refetch()}>Retry</Button>}
          severity="error"
        >
          Products could not be loaded.
        </Alert>
      )}
      {products.isSuccess && products.data.data.length === 0 && (
        <Paper variant="outlined" sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h6">No products found</Typography>
          <Typography color="text.secondary">
            Adjust the filters or add the first product.
          </Typography>
        </Paper>
      )}
      {products.isSuccess && products.data.data.length > 0 && (
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Price</TableCell>
                  <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Location</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.data.data.map((product) => (
                  <TableRow hover key={product.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>{product.name}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        {product.sku}
                      </Typography>
                      {!product.isActive && <Chip label="Inactive" size="small" sx={{ mt: 0.5 }} />}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {product.category}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>{product.currentStock}</Typography>
                      {product.isLowStock && (
                        <Chip color="warning" label="Low stock" size="small" variant="outlined" />
                      )}
                      <Typography color="text.secondary" variant="caption">
                        {' '}
                        Min {product.minimumStockAlertQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      {money.format(Number(product.unitPrice))}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                      {product.warehouseLocation}
                    </TableCell>
                    <TableCell align="right">
                      <Button component={Link} to={`/products/${product.id}`}>
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
            count={products.data.meta.total}
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
