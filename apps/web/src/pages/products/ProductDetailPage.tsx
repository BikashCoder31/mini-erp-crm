import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  Paper,
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/use-auth';
import { createStockMovement, getProduct, listProductMovements } from '../../features/products/api';
import {
  stockAdjustmentSchema,
  type StockAdjustmentFormValues,
} from '../../features/products/product-schema';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'NPR',
});
const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function movementError(error: unknown): string {
  if (!axios.isAxiosError(error)) return 'The stock adjustment failed.';
  const payload = error.response?.data as
    | {
        error?: {
          code?: string;
          message?: string;
          details?: Array<{ field?: string; message: string }>;
        };
      }
    | undefined;
  if (payload?.error?.code === 'INSUFFICIENT_STOCK') {
    const available = payload.error.details?.find(
      (detail) => detail.field === 'availableQuantity',
    )?.message;
    const requested = payload.error.details?.find(
      (detail) => detail.field === 'requestedQuantity',
    )?.message;
    return `Insufficient stock: requested ${requested ?? 'quantity'}; available ${available ?? 'quantity'}.`;
  }
  return payload?.error?.message ?? 'The stock adjustment failed.';
}

export function ProductDetailPage() {
  const { id = '' } = useParams();
  const { hasRole } = useAuth();
  const queryClient = useQueryClient();
  const [movementPage, setMovementPage] = useState(1);
  const [pendingOut, setPendingOut] = useState<StockAdjustmentFormValues | null>(null);
  const product = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  });
  const movements = useQuery({
    queryKey: ['product-stock-movements', id, movementPage],
    queryFn: () => listProductMovements(id, movementPage),
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<StockAdjustmentFormValues>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: { movementType: 'IN', quantity: 1, reason: '' },
  });
  const selectedType = watch('movementType');
  const selectedQuantity = watch('quantity');
  const canMutate = hasRole('ADMIN', 'WAREHOUSE');

  const adjust = useMutation({
    mutationFn: (values: StockAdjustmentFormValues) => createStockMovement(id, values),
    onSuccess: async () => {
      setPendingOut(null);
      reset({ movementType: 'IN', quantity: 1, reason: '' });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['product', id] }),
        queryClient.invalidateQueries({
          queryKey: ['product-stock-movements', id],
        }),
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['stock-movements'] }),
      ]);
    },
  });

  if (product.isPending) return <CircularProgress aria-label="Loading product" />;
  if (product.isError) return <Alert severity="error">Product could not be loaded.</Alert>;

  const submitAdjustment = (values: StockAdjustmentFormValues) => {
    if (values.movementType === 'OUT') setPendingOut(values);
    else adjust.mutate(values);
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
            {product.data.name}
          </Typography>
          <Typography color="text.secondary">{product.data.sku}</Typography>
        </Box>
        {canMutate && (
          <Button component={Link} to={`/products/${id}/edit`} variant="contained">
            Edit product
          </Button>
        )}
      </Stack>

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Chip
              color={product.data.isActive ? 'success' : 'default'}
              label={product.data.isActive ? 'Active' : 'Inactive'}
            />
            <Chip label={product.data.category} variant="outlined" />
            {product.data.isLowStock && (
              <Chip color="warning" label="Low stock" variant="outlined" />
            )}
          </Stack>
          <Box>
            <Typography color="text.secondary" variant="overline">
              Current stock
            </Typography>
            <Typography component="p" variant="h2">
              {product.data.currentStock}
            </Typography>
            <Typography color="text.secondary">
              Alert threshold: {product.data.minimumStockAlertQuantity}
            </Typography>
          </Box>
          <Divider />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Typography>
              <strong>Unit price:</strong> {money.format(Number(product.data.unitPrice))}
            </Typography>
            <Typography>
              <strong>Location:</strong> {product.data.warehouseLocation}
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Created by {product.data.createdBy.name} · Updated{' '}
            {dateTime.format(new Date(product.data.updatedAt))}
          </Typography>
        </Stack>
      </Paper>

      {canMutate && product.data.isActive && (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Adjust stock
          </Typography>
          <Stack component="form" spacing={2} onSubmit={handleSubmit(submitAdjustment)}>
            {adjust.isError && <Alert severity="error">{movementError(adjust.error)}</Alert>}
            {selectedType === 'OUT' && Number(selectedQuantity) > product.data.currentStock && (
              <Alert severity="warning">
                This exceeds the displayed balance of {product.data.currentStock}. The server will
                reject any adjustment that could make stock negative.
              </Alert>
            )}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                error={Boolean(errors.movementType)}
                helperText={errors.movementType?.message}
                label="Movement type"
                select
                sx={{ minWidth: 180 }}
                {...register('movementType')}
              >
                <MenuItem value="IN">IN — add stock</MenuItem>
                <MenuItem value="OUT">OUT — reduce stock</MenuItem>
              </TextField>
              <TextField
                error={Boolean(errors.quantity)}
                helperText={errors.quantity?.message}
                label="Quantity"
                slotProps={{ htmlInput: { min: 1, step: 1 } }}
                type="number"
                {...register('quantity', { valueAsNumber: true })}
              />
            </Stack>
            <TextField
              error={Boolean(errors.reason)}
              helperText={errors.reason?.message}
              label="Reason"
              multiline
              minRows={2}
              {...register('reason')}
            />
            <Button disabled={adjust.isPending} type="submit" variant="contained">
              {adjust.isPending ? 'Recording...' : 'Record adjustment'}
            </Button>
          </Stack>
        </Paper>
      )}
      {canMutate && !product.data.isActive && (
        <Alert severity="info">Reactivate this product before recording a stock adjustment.</Alert>
      )}

      <Typography component="h2" variant="h5">
        Stock movement history
      </Typography>
      {movements.isPending && <CircularProgress aria-label="Loading stock movements" />}
      {movements.isError && <Alert severity="error">Stock movements could not be loaded.</Alert>}
      {movements.isSuccess && movements.data.data.length === 0 && (
        <Typography color="text.secondary">No stock movements recorded yet.</Typography>
      )}
      {movements.isSuccess && movements.data.data.length > 0 && (
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    Reference
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    Recorded by
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movements.data.data.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <Chip
                        color={movement.movementType === 'IN' ? 'success' : 'warning'}
                        label={movement.movementType}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>
                      {movement.balanceBefore} → {movement.balanceAfter}
                    </TableCell>
                    <TableCell>{movement.reason}</TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      {movement.referenceType}
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Typography variant="body2">{movement.createdBy.name}</Typography>
                      <Typography color="text.secondary" variant="caption">
                        {dateTime.format(new Date(movement.createdAt))}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={movements.data.meta.total}
            onPageChange={(_event, nextPage) => setMovementPage(nextPage + 1)}
            page={movementPage - 1}
            rowsPerPage={20}
            rowsPerPageOptions={[20]}
          />
        </Paper>
      )}

      <Dialog
        aria-describedby="confirm-stock-out-description"
        aria-labelledby="confirm-stock-out-title"
        onClose={() => setPendingOut(null)}
        open={Boolean(pendingOut)}
      >
        <DialogTitle id="confirm-stock-out-title">Confirm stock reduction</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-stock-out-description">
            Reduce stock by {pendingOut?.quantity ?? 0}? This creates an immutable OUT movement and
            cannot be edited later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingOut(null)}>Keep editing</Button>
          <Button
            color="warning"
            disabled={adjust.isPending}
            onClick={() => pendingOut && adjust.mutate(pendingOut)}
            variant="contained"
          >
            Confirm OUT
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
