import React, { Suspense } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from 'components/Footer/Footer';

function App() {
  return (
    <Suspense fallback={<div>loading..</div>}>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </div>
    </Suspense>
  );
}

export default App;
