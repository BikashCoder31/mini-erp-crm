import { Alert, Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';

type HealthResponse = {
  data: { status: string; service: string; timestamp: string };
};

export function FoundationPage() {
  const health = useQuery({
    queryKey: ['health', 'live'],
    queryFn: async () => (await apiClient.get<HealthResponse>('/health/live')).data,
  });

  return (
    <Container sx={{ py: { xs: 4, md: 8 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography color="primary" sx={{ fontWeight: 700 }} gutterBottom>
              MINI ERP + CRM
            </Typography>
            <Typography variant="h3" component="h1" gutterBottom>
              Operations portal foundation
            </Typography>
            <Typography color="text.secondary">
              Authentication, customer CRM, inventory, and sales challan modules are being built on
              this verified application shell.
            </Typography>
          </Box>
          {health.isPending && <Alert severity="info">Checking API connectivity...</Alert>}
          {health.isSuccess && (
            <Alert severity="success">API connected: {health.data.data.service}</Alert>
          )}
          {health.isError && (
            <Alert severity="warning">
              The web app is ready, but the local API is not currently reachable.
            </Alert>
          )}
          <Button variant="contained" disabled>
            Login arrives in the authentication phase
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
