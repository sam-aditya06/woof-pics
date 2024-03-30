import { useContext } from "react";

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ThemeContext } from "./ThemeContext";

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="sticky top-0 flex items-center gap-2 bg-gray-300 p-3 w-full z-10 dark:bg-gray-900">
      
        <div className="flex items-center dark:text-white">
        <Link to={"/"}><PetsIcon fontSize="large" className="text-red-600" /></Link>
        <Link className="self-end text-2xl" to={"/"}>Pics</Link>
        </div>
      <div className="ml-auto">
        <IconButton className="dark:text-white" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default Header;