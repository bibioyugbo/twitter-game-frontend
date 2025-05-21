import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import 'animate.css';
// import './assets/fonts/WEB/css/satoshi.css'
import GameRoutes from "./router/Router.tsx";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from '@/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={store}>
            <GameRoutes/>
          </Provider>
      </BrowserRouter>
  </StrictMode>,
)
