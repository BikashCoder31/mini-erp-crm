import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginSchema, type LoginValues } from '../features/auth/login-schema';
import { useAuth } from '../features/auth/use-auth';

function safeReturnPath(value: string | null): string {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/dashboard';
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const submit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate(safeReturnPath(searchParams.get('returnTo')), { replace: true });
    } catch (error) {
      resetField('password');
      const code = axios.isAxiosError(error)
        ? (error.response?.data as { error?: { code?: string } } | undefined)?.error?.code
        : undefined;
      setServerError(
        code === 'RATE_LIMIT_EXCEEDED'
          ? 'Too many attempts. Please try again later.'
          : 'Invalid email or password.',
      );
    }
  });

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        background: 'linear-gradient(145deg, #eff4ff 0%, #f8fafc 58%, #eef2f6 100%)',
        display: 'flex',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{ border: '1px solid', borderColor: 'divider', p: { xs: 3, sm: 5 } }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography color="primary" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                MINI ERP + CRM
              </Typography>
              <Typography component="h1" variant="h4" sx={{ mt: 1, fontWeight: 750 }}>
                Sign in to operations
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Use the assessment credentials assigned to your role.
              </Typography>
            </Box>
            {serverError && <Alert severity="error">{serverError}</Alert>}
            <Stack component="form" spacing={2.5} onSubmit={submit} noValidate>
              <TextField
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                label="Email"
                type="email"
                {...register('email')}
              />
              <TextField
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          edge="end"
                          onClick={() => setShowPassword((value) => !value)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button disabled={isSubmitting} size="large" type="submit" variant="contained">
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
