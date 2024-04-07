import { createRoot } from 'react-dom/client';
import { StyledEngineProvider } from "@mui/material";
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);