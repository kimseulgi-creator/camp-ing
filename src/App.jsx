import React from 'react';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import './style/reset.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
