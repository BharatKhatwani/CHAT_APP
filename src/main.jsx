import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom"; // Correct import

createRoot(document.getElementById('root')).render(
  <BrowserRouter>  {/* Correct component */}
    <App />
  </BrowserRouter>
);
