import { RouterProvider } from "react-router-dom";
import router from "./utils/routes";
import { ThemeContextProvider } from "./components/ThemeContext";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}