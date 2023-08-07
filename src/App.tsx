import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from 'components/Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Fallbacks/Error';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Header />
      <ErrorBoundary fallback={<Error />}>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </div>
    </ThemeProvider>
  );
}

export default App;
