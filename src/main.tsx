import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { enableMSW } from './api/mocks';

enableMSW()
  .then(() => {
    console.log('MSW setup completed');
  })
  .catch((error) => {
    console.warn('MSW setup failed, continuing without mocks:', error);
  })
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
