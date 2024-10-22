import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocketProvider } from './Context/ScoketContext.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { DataProvider } from './Context/DataContext.jsx'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <DataProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </DataProvider>
    </UserProvider>
  </BrowserRouter>,
)
