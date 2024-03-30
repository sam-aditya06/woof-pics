import Layout from "../components/Layout";
import DogImages from "../pages/DogImages";
import Home from "../pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="page/:pageNum" element={<Home />} />
      <Route path="search" element={<Home />} />
      <Route path="images/:breed" element={<DogImages />} />
      <Route path="images/:breed/:sub_breed" element={<DogImages />} />
    </Route>
  )
);

export default router;