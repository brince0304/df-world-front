import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from 'components/Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Fallbacks/Error';

function App() {
  return (
    <div className="App">
      <Header />
      <ErrorBoundary fallback={<Error />}>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
}

export default App;
