import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../features/auth/use-auth';
import {
  addCustomerFollowUp,
  getCustomer,
  listCustomerFollowUps,
} from '../../features/customers/api';
import { followUpSchema, type FollowUpFormValues } from '../../features/customers/customer-schema';

const dateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export function CustomerDetailPage() {
  const { id = '' } = useParams();
  const { hasRole } = useAuth();
  const queryClient = useQueryClient();
  const customer = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id),
  });
  const followUps = useQuery({
    queryKey: ['customerFollowUps', id],
    queryFn: () => listCustomerFollowUps(id),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FollowUpFormValues>({
    resolver: zodResolver(followUpSchema),
    defaultValues: { note: '', nextFollowUpDate: '' },
  });
  const addFollowUp = useMutation({
    mutationFn: (values: FollowUpFormValues) =>
      addCustomerFollowUp(id, {
        note: values.note,
        ...(values.nextFollowUpDate
          ? { nextFollowUpDate: new Date(values.nextFollowUpDate).toISOString() }
          : {}),
      }),
    onSuccess: async () => {
      reset();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['customer', id] }),
        queryClient.invalidateQueries({ queryKey: ['customerFollowUps', id] }),
        queryClient.invalidateQueries({ queryKey: ['customers'] }),
      ]);
    },
  });

  if (customer.isPending) return <CircularProgress aria-label="Loading customer" />;
  if (customer.isError) return <Alert severity="error">Customer could not be loaded.</Alert>;

  return (
    <Stack spacing={3}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Box>
          <Typography component="h1" variant="h4">
            {customer.data.name}
          </Typography>
          <Typography color="text.secondary">{customer.data.businessName}</Typography>
        </Box>
        {hasRole('ADMIN', 'SALES') && (
          <Button component={Link} to={`/customers/${id}/edit`} variant="contained">
            Edit customer
          </Button>
        )}
      </Stack>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Chip label={customer.data.status} />
            <Chip label={customer.data.customerType} variant="outlined" />
          </Stack>
          <Typography>
            <strong>Email:</strong> {customer.data.email}
          </Typography>
          <Typography>
            <strong>Mobile:</strong> {customer.data.mobileNumber}
          </Typography>
          {customer.data.gstNumber && (
            <Typography>
              <strong>GST:</strong> {customer.data.gstNumber}
            </Typography>
          )}
          <Typography>
            <strong>Address:</strong> {customer.data.address}
          </Typography>
          <Typography>
            <strong>Next follow-up:</strong> {dateTime.format(new Date(customer.data.followUpDate))}
          </Typography>
          <Divider />
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>{customer.data.notes}</Typography>
          <Typography color="text.secondary" variant="body2">
            Created by {customer.data.createdBy.name} · Updated{' '}
            {dateTime.format(new Date(customer.data.updatedAt))}
          </Typography>
        </Stack>
      </Paper>

      <Typography component="h2" variant="h5">
        Follow-up timeline
      </Typography>
      {hasRole('ADMIN', 'SALES') && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit((values) => addFollowUp.mutate(values))}
          >
            {addFollowUp.isError && <Alert severity="error">Follow-up could not be added.</Alert>}
            <TextField
              error={Boolean(errors.note)}
              helperText={errors.note?.message}
              label="Follow-up note"
              multiline
              minRows={3}
              {...register('note')}
            />
            <TextField
              label="Next follow-up date (optional)"
              type="datetime-local"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register('nextFollowUpDate')}
            />
            <Button disabled={addFollowUp.isPending} type="submit" variant="contained">
              {addFollowUp.isPending ? 'Adding...' : 'Add follow-up'}
            </Button>
          </Stack>
        </Paper>
      )}
      {followUps.isPending && <CircularProgress aria-label="Loading follow-ups" />}
      {followUps.isError && <Alert severity="error">Follow-ups could not be loaded.</Alert>}
      {followUps.isSuccess && followUps.data.data.length === 0 && (
        <Typography color="text.secondary">No follow-ups recorded yet.</Typography>
      )}
      {followUps.isSuccess &&
        followUps.data.data.map((followUp) => (
          <Paper key={followUp.id} variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>{followUp.note}</Typography>
              {followUp.nextFollowUpDate && (
                <Typography color="primary">
                  Next follow-up: {dateTime.format(new Date(followUp.nextFollowUpDate))}
                </Typography>
              )}
              <Typography color="text.secondary" variant="body2">
                {followUp.createdBy.name} · {dateTime.format(new Date(followUp.createdAt))}
              </Typography>
            </Stack>
          </Paper>
        ))}
    </Stack>
  );
}
