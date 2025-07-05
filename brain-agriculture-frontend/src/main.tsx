import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

import { Layout } from './components/Layout.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { ProducersPage } from './pages/ProducersPage.tsx';
import { AddProducerPage } from './pages/AddProducerPage.tsx';
import { EditProducerPage } from './pages/EditProducerPage.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'producers',
        element: <ProducersPage />,
      },
      {
        path: 'producers/new',
        element: <AddProducerPage />,
      },
      {
        path: 'producers/edit/:producerId',
        element: <EditProducerPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);