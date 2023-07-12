import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import './i18next'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Suspense fallback={(<div>MdLocalDining.....</div>)}>
        <App />
      </Suspense>
    </React.StrictMode>
  </ChakraProvider>
);
