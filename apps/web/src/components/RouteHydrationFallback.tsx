export function RouteHydrationFallback() {
  return (
    <div
      role="status"
      style={{
        alignItems: 'center',
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
      }}
    >
      Loading application…
    </div>
  );
}
