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
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/use-auth';
import { cancelChallan, confirmChallan, getChallan } from '../../features/challans/api';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'NPR',
});
const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function lifecycleError(error: unknown): string {
  if (!axios.isAxiosError(error)) return 'The lifecycle action failed.';
  const payload = error.response?.data as
    | {
        error?: {
          code?: string;
          message?: string;
          details?: Array<{
            productName?: string;
            sku?: string;
            requestedQuantity?: number;
            availableQuantity?: number;
          }>;
        };
      }
    | undefined;
  if (payload?.error?.code === 'INSUFFICIENT_STOCK') {
    const lines = (payload.error.details ?? [])
      .map(
        (detail) =>
          `${detail.productName ?? detail.sku}: requested ${detail.requestedQuantity}, available ${detail.availableQuantity}`,
      )
      .join('; ');
    return `Confirmation failed. The Draft was preserved. ${lines}`;
  }
  return payload?.error?.message ?? 'The lifecycle action failed.';
}

export function ChallanDetailPage() {
  const { id = '' } = useParams();
  const { hasRole } = useAuth();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const challan = useQuery({
    queryKey: ['challan', id],
    queryFn: () => getChallan(id),
  });

  const invalidateLifecycle = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['challan', id] }),
      queryClient.invalidateQueries({ queryKey: ['challans'] }),
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      queryClient.invalidateQueries({ queryKey: ['stock-movements'] }),
      queryClient.invalidateQueries({ queryKey: ['customer'] }),
    ]);
  };
  const confirm = useMutation({
    mutationFn: () => confirmChallan(id),
    onSuccess: async () => {
      setConfirmOpen(false);
      await invalidateLifecycle();
    },
  });
  const cancel = useMutation({
    mutationFn: () => cancelChallan(id, cancelReason.trim() || undefined),
    onSuccess: async () => {
      setCancelOpen(false);
      setCancelReason('');
      await invalidateLifecycle();
    },
  });

  if (challan.isPending) return <CircularProgress aria-label="Loading challan" />;
  if (challan.isError) return <Alert severity="error">Challan could not be loaded.</Alert>;

  const data = challan.data;
  const canEditDraft = data.status === 'DRAFT' && hasRole('ADMIN', 'SALES');
  const canCancel =
    (data.status === 'DRAFT' && hasRole('ADMIN', 'SALES')) ||
    (data.status === 'CONFIRMED' && hasRole('ADMIN'));

  return (
    <Stack spacing={3} sx={{ minWidth: 0 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="h1" sx={{ overflowWrap: 'anywhere' }} variant="h4">
            {data.challanNumber}
          </Typography>
          <Typography color="text.secondary">
            Created {dateTime.format(new Date(data.createdAt))}
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Chip label={data.status} />
          {canEditDraft && (
            <Button component={Link} to={`/challans/${id}/edit`}>
              Edit Draft
            </Button>
          )}
          {canEditDraft && (
            <Button onClick={() => setConfirmOpen(true)} variant="contained">
              Confirm challan
            </Button>
          )}
          {canCancel && (
            <Button color="error" onClick={() => setCancelOpen(true)}>
              Cancel challan
            </Button>
          )}
        </Stack>
      </Stack>

      {(confirm.isError || cancel.isError) && (
        <Alert severity="error">{lifecycleError(confirm.error ?? cancel.error)}</Alert>
      )}
      {data.status !== 'DRAFT' && (
        <Alert severity="info">
          Historical product snapshot — these item names, prices, categories, and locations are
          preserved from the saved Draft.
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h2" variant="h6">
          Customer
        </Typography>
        <Typography sx={{ fontWeight: 700 }}>{data.customer.name}</Typography>
        <Typography>{data.customer.businessName}</Typography>
        <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
          {data.customer.mobileNumber} · {data.customer.email}
        </Typography>
        <Typography color="text.secondary">{data.customer.address}</Typography>
      </Paper>

      <Typography component="h2" variant="h5">
        Product snapshots
      </Typography>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                  Category / location
                </TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Unit price</TableCell>
                <TableCell align="right">Line total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Button
                      component={Link}
                      sx={{ p: 0, textAlign: 'left' }}
                      to={`/products/${item.productId}`}
                    >
                      {item.productName}
                    </Button>
                    <Typography color="text.secondary" variant="body2">
                      {item.productSku}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Typography>{item.productCategory}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {item.warehouseLocation}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    {money.format(Number(item.unitPrice))}
                  </TableCell>
                  <TableCell align="right">{money.format(Number(item.lineTotal))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography>
            {data.items.length} line(s) · {data.totalQuantity} total units
          </Typography>
          <Typography variant="h5">{money.format(Number(data.totalAmount))}</Typography>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 1 }}>
          Lifecycle audit
        </Typography>
        <Typography>
          Created by {data.createdBy.name} on {dateTime.format(new Date(data.createdAt))}
        </Typography>
        {data.confirmedBy && data.confirmedAt && (
          <Typography>
            Confirmed by {data.confirmedBy.name} on {dateTime.format(new Date(data.confirmedAt))}
          </Typography>
        )}
        {data.cancelledBy && data.cancelledAt && (
          <Typography>
            Cancelled by {data.cancelledBy.name} on {dateTime.format(new Date(data.cancelledAt))}
          </Typography>
        )}
        {data.cancellationReason && (
          <Typography color="text.secondary">Reason: {data.cancellationReason}</Typography>
        )}
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
          Confirming deducts every line atomically. Admin cancellation of a Confirmed challan
          restores all quantities through new ledger entries.
        </Typography>
      </Paper>

      <Dialog
        aria-describedby="confirm-challan-description"
        aria-labelledby="confirm-challan-title"
        onClose={() => setConfirmOpen(false)}
        open={confirmOpen}
      >
        <DialogTitle id="confirm-challan-title">Confirm {data.challanNumber}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-challan-description">
            Confirm {data.items.length} line(s) for {data.customer.name}, totalling{' '}
            {data.totalQuantity} units? Stock will be deducted atomically and this challan will
            become immutable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Keep Draft</Button>
          <Button disabled={confirm.isPending} onClick={() => confirm.mutate()} variant="contained">
            Confirm and deduct stock
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        aria-describedby="cancel-challan-description"
        aria-labelledby="cancel-challan-title"
        onClose={() => setCancelOpen(false)}
        open={cancelOpen}
      >
        <DialogTitle id="cancel-challan-title">Cancel {data.challanNumber}</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-challan-description">
            {data.status === 'CONFIRMED'
              ? `This irreversible action restores all ${data.totalQuantity} units through audited IN movements.`
              : 'This Draft has not changed stock. Cancellation is irreversible.'}
          </DialogContentText>
          <TextField
            error={
              data.status === 'CONFIRMED' &&
              cancelReason.trim().length > 0 &&
              cancelReason.trim().length < 3
            }
            fullWidth
            helperText={
              data.status === 'CONFIRMED'
                ? 'Required for a Confirmed challan.'
                : 'Optional for a Draft.'
            }
            label="Cancellation reason"
            margin="normal"
            multiline
            minRows={2}
            onChange={(event) => setCancelReason(event.target.value)}
            value={cancelReason}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelOpen(false)}>Keep challan</Button>
          <Button
            color="error"
            disabled={
              cancel.isPending || (data.status === 'CONFIRMED' && cancelReason.trim().length < 3)
            }
            onClick={() => cancel.mutate()}
            variant="contained"
          >
            Cancel challan
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
