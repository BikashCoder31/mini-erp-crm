import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createCustomer, getCustomer, updateCustomer } from '../../features/customers/api';
import { customerSchema, type CustomerFormValues } from '../../features/customers/customer-schema';

function toLocalDateTime(value: string): string {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function CustomerFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const customer = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id!),
    enabled: isEdit,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      mobileNumber: '',
      email: '',
      businessName: '',
      gstNumber: '',
      customerType: 'RETAIL',
      address: '',
      status: 'LEAD',
      followUpDate: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (!customer.data) return;
    reset({
      name: customer.data.name,
      mobileNumber: customer.data.mobileNumber,
      email: customer.data.email,
      businessName: customer.data.businessName,
      gstNumber: customer.data.gstNumber ?? '',
      customerType: customer.data.customerType,
      address: customer.data.address,
      status: customer.data.status,
      followUpDate: toLocalDateTime(customer.data.followUpDate),
      notes: customer.data.notes,
    });
  }, [customer.data, reset]);

  const save = useMutation({
    mutationFn: async (values: CustomerFormValues) => {
      const input = {
        ...values,
        gstNumber: values.gstNumber || undefined,
        followUpDate: new Date(values.followUpDate).toISOString(),
      };
      return isEdit ? updateCustomer(id!, input) : createCustomer(input);
    },
    onSuccess: async (saved) => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.setQueryData(['customer', saved.id], saved);
      navigate(`/customers/${saved.id}`, { replace: true });
    },
  });

  if (isEdit && customer.isPending) return <CircularProgress aria-label="Loading customer" />;
  if (isEdit && customer.isError)
    return <Alert severity="error">Customer could not be loaded.</Alert>;

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        {isEdit ? 'Edit customer' : 'Add customer'}
      </Typography>
      {save.isError && <Alert severity="error">The customer could not be saved.</Alert>}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
        <Stack
          component="form"
          spacing={3}
          onSubmit={handleSubmit((values) => save.mutate(values))}
        >
          <Typography variant="h6">Customer identity</Typography>
          <TextField
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            label="Customer name"
            {...register('name')}
          />
          <TextField
            error={Boolean(errors.businessName)}
            helperText={errors.businessName?.message}
            label="Business name"
            {...register('businessName')}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              error={Boolean(errors.mobileNumber)}
              helperText={errors.mobileNumber?.message}
              label="Mobile number"
              sx={{ flex: 1 }}
              {...register('mobileNumber')}
            />
            <TextField
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              label="Email"
              sx={{ flex: 1 }}
              type="email"
              {...register('email')}
            />
          </Stack>
          <TextField
            error={Boolean(errors.gstNumber)}
            helperText={errors.gstNumber?.message ?? 'External GST validation is not performed.'}
            label="GST number (optional)"
            {...register('gstNumber')}
          />
          <Typography variant="h6">CRM classification</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField label="Customer type" select sx={{ flex: 1 }} {...register('customerType')}>
              <MenuItem value="RETAIL">Retail</MenuItem>
              <MenuItem value="WHOLESALE">Wholesale</MenuItem>
              <MenuItem value="DISTRIBUTOR">Distributor</MenuItem>
            </TextField>
            <TextField label="Status" select sx={{ flex: 1 }} {...register('status')}>
              <MenuItem value="LEAD">Lead</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </TextField>
          </Stack>
          <TextField
            error={Boolean(errors.followUpDate)}
            helperText={errors.followUpDate?.message}
            label="Next follow-up"
            type="datetime-local"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('followUpDate')}
          />
          <TextField
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
            label="Address"
            multiline
            minRows={2}
            {...register('address')}
          />
          <TextField
            error={Boolean(errors.notes)}
            helperText={errors.notes?.message}
            label="General notes"
            multiline
            minRows={4}
            {...register('notes')}
          />
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button component={Link} to={id ? `/customers/${id}` : '/customers'}>
              Cancel
            </Button>
            <Button disabled={save.isPending} type="submit" variant="contained">
              {save.isPending ? 'Saving...' : 'Save customer'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
