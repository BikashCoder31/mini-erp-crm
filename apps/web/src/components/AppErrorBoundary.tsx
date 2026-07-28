import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { Component, type ErrorInfo, type ReactNode } from 'react';

type State = { failed: boolean };

export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error(error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Container component="main" maxWidth="sm" sx={{ py: 10 }}>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Stack spacing={2}>
            <Typography component="h1" variant="h4">
              The workspace hit an unexpected error
            </Typography>
            <Typography color="text.secondary">
              Reload the application to start from a safe state.
            </Typography>
            <Button onClick={() => window.location.reload()} variant="contained">
              Reload application
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }
}
