import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProduct, updateProduct } from '../../features/products/api';
import { productSchema, type ProductFormValues } from '../../features/products/product-schema';

export function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const product = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id!),
    enabled: isEdit,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: '',
      unitPrice: '',
      openingStock: 0,
      minimumStockAlertQuantity: 0,
      warehouseLocation: '',
      isActive: true,
    },
  });

  useEffect(() => {
    if (!product.data) return;
    reset({
      name: product.data.name,
      sku: product.data.sku,
      category: product.data.category,
      unitPrice: product.data.unitPrice,
      openingStock: 0,
      minimumStockAlertQuantity: product.data.minimumStockAlertQuantity,
      warehouseLocation: product.data.warehouseLocation,
      isActive: product.data.isActive,
    });
  }, [product.data, reset]);

  const save = useMutation({
    mutationFn: (values: ProductFormValues) =>
      isEdit
        ? updateProduct(id!, {
            name: values.name,
            sku: values.sku,
            category: values.category,
            unitPrice: values.unitPrice,
            minimumStockAlertQuantity: values.minimumStockAlertQuantity,
            warehouseLocation: values.warehouseLocation,
            isActive: values.isActive,
          })
        : createProduct({
            name: values.name,
            sku: values.sku,
            category: values.category,
            unitPrice: values.unitPrice,
            openingStock: values.openingStock,
            minimumStockAlertQuantity: values.minimumStockAlertQuantity,
            warehouseLocation: values.warehouseLocation,
          }),
    onSuccess: async (saved) => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.setQueryData(['product', saved.id], saved);
      navigate(`/products/${saved.id}`, { replace: true });
    },
  });

  if (isEdit && product.isPending) return <CircularProgress aria-label="Loading product" />;
  if (isEdit && product.isError)
    return <Alert severity="error">Product could not be loaded.</Alert>;

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        {isEdit ? 'Edit product' : 'Add product'}
      </Typography>
      {save.isError && (
        <Alert severity="error">
          The product could not be saved. Check the SKU and entered values.
        </Alert>
      )}
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
        <Stack
          component="form"
          spacing={3}
          onSubmit={handleSubmit((values) => save.mutate(values))}
        >
          <Typography variant="h6">Product identity</Typography>
          <TextField
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            label="Product name"
            {...register('name')}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              error={Boolean(errors.sku)}
              helperText={errors.sku?.message}
              label="SKU / code"
              sx={{ flex: 1 }}
              {...register('sku')}
            />
            <TextField
              error={Boolean(errors.category)}
              helperText={errors.category?.message}
              label="Category"
              sx={{ flex: 1 }}
              {...register('category')}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              error={Boolean(errors.unitPrice)}
              helperText={errors.unitPrice?.message}
              inputMode="decimal"
              label="Unit price (NPR)"
              sx={{ flex: 1 }}
              {...register('unitPrice')}
            />
            <TextField
              error={Boolean(errors.minimumStockAlertQuantity)}
              helperText={errors.minimumStockAlertQuantity?.message}
              label="Minimum stock alert quantity"
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
              sx={{ flex: 1 }}
              type="number"
              {...register('minimumStockAlertQuantity', {
                valueAsNumber: true,
              })}
            />
          </Stack>
          <TextField
            error={Boolean(errors.warehouseLocation)}
            helperText={errors.warehouseLocation?.message}
            label="Warehouse location"
            {...register('warehouseLocation')}
          />
          {!isEdit && (
            <>
              <TextField
                error={Boolean(errors.openingStock)}
                helperText={
                  errors.openingStock?.message ??
                  'Later stock changes are recorded as audited adjustments.'
                }
                label="Opening stock"
                slotProps={{ htmlInput: { min: 0, step: 1 } }}
                type="number"
                {...register('openingStock', { valueAsNumber: true })}
              />
            </>
          )}
          {isEdit && (
            <FormControlLabel
              control={<Checkbox {...register('isActive')} />}
              label="Active product"
            />
          )}
          {isEdit && (
            <Alert severity="warning">
              Deactivated products retain their stock and history, but cannot receive adjustments or
              be used in new challans.
            </Alert>
          )}
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button component={Link} to={id ? `/products/${id}` : '/products'}>
              Cancel
            </Button>
            <Button disabled={save.isPending} type="submit" variant="contained">
              {save.isPending ? 'Saving...' : 'Save product'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
