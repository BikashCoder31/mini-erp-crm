import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography variant="h2">Page not found</Typography>
        <Typography color="text.secondary">The requested page does not exist.</Typography>
        <Button component={Link} to="/login" variant="contained">
          Return to the portal
        </Button>
      </Stack>
    </Container>
  );
}
