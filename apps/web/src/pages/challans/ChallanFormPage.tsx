import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listCustomers } from '../../features/customers/api';
import {
  confirmChallan,
  createChallan,
  getChallan,
  updateChallan,
} from '../../features/challans/api';
import { challanSchema, type ChallanFormValues } from '../../features/challans/challan-schema';
import { listProducts } from '../../features/products/api';

const money = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'NPR',
});

export function ChallanFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);
  const challan = useQuery({
    queryKey: ['challan', id],
    queryFn: () => getChallan(id!),
    enabled: isEdit,
  });
  const customers = useQuery({
    queryKey: ['customers', { page: 1, limit: 100, challanPicker: true }],
    queryFn: () => listCustomers({ page: 1, limit: 100 }),
  });
  const products = useQuery({
    queryKey: ['products', { page: 1, limit: 100, isActive: true }],
    queryFn: () => listProducts({ page: 1, limit: 100, isActive: true }),
  });
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ChallanFormValues>({
    resolver: zodResolver(challanSchema),
    defaultValues: {
      customerId: '',
      items: [{ productId: '', quantity: 1 }],
    },
  });
  const fields = useFieldArray({ control, name: 'items' });
  const watchedItems = watch('items');

  useEffect(() => {
    if (!challan.data) return;
    if (challan.data.status !== 'DRAFT') {
      navigate(`/challans/${challan.data.id}`, { replace: true });
      return;
    }
    reset({
      customerId: challan.data.customer.id,
      items: challan.data.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });
  }, [challan.data, navigate, reset]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [isDirty]);

  const save = useMutation({
    mutationFn: async ({
      values,
      confirmAfterSave,
    }: {
      values: ChallanFormValues;
      confirmAfterSave: boolean;
    }) => {
      const saved = isEdit ? await updateChallan(id!, values) : await createChallan(values);
      setSavedDraftId(saved.id);
      return confirmAfterSave ? confirmChallan(saved.id) : saved;
    },
    onSuccess: async (saved) => {
      setSavedDraftId(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['challans'] }),
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['stock-movements'] }),
      ]);
      queryClient.setQueryData(['challan', saved.id], saved);
      navigate(`/challans/${saved.id}`, { replace: true });
    },
  });

  const productById = new Map((products.data?.data ?? []).map((product) => [product.id, product]));
  const preview = watchedItems.reduce(
    (totals, item) => {
      const product = productById.get(item.productId);
      const quantity = Number.isFinite(item.quantity) ? item.quantity : 0;
      return {
        quantity: totals.quantity + quantity,
        amount: totals.amount + Number(product?.unitPrice ?? 0) * quantity,
      };
    },
    { quantity: 0, amount: 0 },
  );
  const selectedIds = new Set(watchedItems.map((item) => item.productId));

  if ((isEdit && challan.isPending) || customers.isPending || products.isPending)
    return <CircularProgress aria-label="Loading challan builder" />;
  if ((isEdit && challan.isError) || customers.isError || products.isError)
    return <Alert severity="error">The challan builder could not load.</Alert>;

  const runSave = (confirmAfterSave: boolean) => (values: ChallanFormValues) =>
    save.mutate({ values, confirmAfterSave });

  return (
    <Stack spacing={3}>
      <Box>
        <Typography component="h1" variant="h4">
          {isEdit ? 'Edit Draft challan' : 'New sales challan'}
        </Typography>
        <Typography color="text.secondary">
          Server snapshots and totals replace these previews when the Draft is saved.
        </Typography>
      </Box>
      {save.isError && (
        <Alert severity="error">
          {savedDraftId ? (
            <>
              The Draft was saved, but confirmation failed.{' '}
              <Link to={`/challans/${savedDraftId}`}>Open the preserved Draft</Link> to review stock
              and try again.
            </>
          ) : (
            'The Draft could not be saved. Review the selected records and quantities.'
          )}
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
        <Stack spacing={3}>
          <TextField
            error={Boolean(errors.customerId)}
            helperText={errors.customerId?.message}
            label="Customer"
            select
            {...register('customerId')}
          >
            {(customers.data?.data ?? []).map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name} — {customer.businessName}
              </MenuItem>
            ))}
          </TextField>
          <Typography component="h2" variant="h6">
            Products
          </Typography>
          {typeof errors.items?.message === 'string' && (
            <Alert severity="error">{errors.items.message}</Alert>
          )}
          {fields.fields.map((field, index) => {
            const selectedProduct = productById.get(watchedItems[index]?.productId);
            return (
              <Paper key={field.id} variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <TextField
                    error={Boolean(errors.items?.[index]?.productId)}
                    helperText={errors.items?.[index]?.productId?.message}
                    label={`Product ${index + 1}`}
                    select
                    {...register(`items.${index}.productId`)}
                  >
                    {(products.data?.data ?? []).map((product) => (
                      <MenuItem
                        disabled={
                          selectedIds.has(product.id) &&
                          product.id !== watchedItems[index]?.productId
                        }
                        key={product.id}
                        value={product.id}
                      >
                        {product.name} ({product.sku}) — stock {product.currentStock}
                      </MenuItem>
                    ))}
                  </TextField>
                  {selectedProduct && (
                    <Typography color="text.secondary" variant="body2">
                      {money.format(Number(selectedProduct.unitPrice))} ·{' '}
                      {selectedProduct.warehouseLocation} · available {selectedProduct.currentStock}
                    </Typography>
                  )}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      error={Boolean(errors.items?.[index]?.quantity)}
                      helperText={errors.items?.[index]?.quantity?.message}
                      label={`Quantity for line ${index + 1}`}
                      slotProps={{ htmlInput: { min: 1, step: 1 } }}
                      sx={{ flex: 1 }}
                      type="number"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Button
                      color="error"
                      disabled={fields.fields.length === 1}
                      onClick={() => fields.remove(index)}
                    >
                      Remove {selectedProduct?.sku ?? `line ${index + 1}`}
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
          <Button onClick={() => fields.append({ productId: '', quantity: 1 })} variant="outlined">
            Add product line
          </Button>
          <Paper sx={{ bgcolor: 'action.hover', p: 2 }} variant="outlined">
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between' }}>
              <Typography>{fields.fields.length} distinct line(s)</Typography>
              <Typography>Total quantity: {preview.quantity}</Typography>
              <Typography sx={{ fontWeight: 800 }}>
                Preview total: {money.format(preview.amount)}
              </Typography>
            </Stack>
          </Paper>
          <Stack
            direction={{ xs: 'column-reverse', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'flex-end' }}
          >
            <Button component={Link} to={id ? `/challans/${id}` : '/challans'}>
              Cancel
            </Button>
            <Button
              disabled={save.isPending}
              onClick={handleSubmit(runSave(false))}
              variant="outlined"
            >
              Save Draft
            </Button>
            <Button
              disabled={save.isPending}
              onClick={handleSubmit(runSave(true))}
              variant="contained"
            >
              Save & Confirm
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
