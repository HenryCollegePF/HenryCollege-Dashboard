import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { createTheme,ThemeProvider } from '@mui/material'


const persistor = persistStore(store)

export const theme= createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffff00',
      dark: '#f9fbe7',
      contrastText: '#f4ff81',
    },
    secondary: {
      main: '#212121',
      dark: '#ffff00',
      contrastText: '#000',
    },
    background: {
      main: '#212121'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
)
