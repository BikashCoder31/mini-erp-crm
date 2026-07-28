import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function ForbiddenPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Typography component="h1" variant="h2">
          Access restricted
        </Typography>
        <Typography color="text.secondary">
          Your role does not have permission to open this workspace.
        </Typography>
        <Button component={Link} to="/dashboard" variant="contained">
          Return to dashboard
        </Button>
      </Stack>
    </Container>
  );
}
