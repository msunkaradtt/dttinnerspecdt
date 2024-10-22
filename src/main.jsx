import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import { ToastifyProvider } from "./providers"

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ThemeProvider } from "@material-tailwind/react";

/*const stepzen_client = new ApolloClient({
  uri: 'http://127.0.0.1:9000/api/culdetect/__graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: 'Apikey ' + import.meta.env.VITE_STEPZEN_API_KEY,
  }
})*/

/**
 *   <ApolloProvider client={stepzen_client}>
    <App />
  </ApolloProvider>
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <React.StrictMode>
      <ToastifyProvider>
        <App />
      </ToastifyProvider>
    </React.StrictMode>
  </ThemeProvider>
)
