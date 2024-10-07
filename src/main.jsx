import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom"; // Correct import
import AppContextProvider from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* Correct component */}
  
   <AppContextProvider>
   <App />
   </AppContextProvider>
  
  </BrowserRouter>
);
