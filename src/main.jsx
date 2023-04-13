import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AuthGoogleProvider from './context/AuthGoogle';
import router from './routes/routes';
import '@picocss/pico';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthGoogleProvider>
      <RouterProvider router={router} />
    </AuthGoogleProvider>
  </React.StrictMode>
);
