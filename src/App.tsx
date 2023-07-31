import { useEffect } from "react";
import {
  Route,
  RouterProvider,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./redux/features/productSlice";
import supabase from "./supabase";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/admin/Admin";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./pages/categoryPages/CategoryPages";
import "./main.scss";

export interface Products {
  id: number;
  Category: string;
  For: string;
  Item: string;
  Name: string;
  Prize: number;
  img: string;
  Isliked: boolean;
  InBasket: boolean;
}
export interface forProps {
  data: Products[];
  fetchData: () => void;
}
const App = () => {
  const dispatch = useDispatch();
  const dataProducts: Products[] = useSelector(
    (state: { product: { value: { item: Products[] } } }) =>
      state.product.value.item
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data, error } = await supabase.from("Products").select();
    if (error) {
      console.log(error);
    } else {
      dispatch(getAllProducts({ item: data }));
    }
  }

  const Root = () => {
    return (
      <>
        <Navbar fetchData={fetchData} data={dataProducts} />
        <Outlet />
        <Footer />
      </>
    );
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home fetchData={fetchData} />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Use CommonCategoryPage component for all category routes */}
        <Route
          path="/Man/*"
          element={
            <CategoryPage
              data={dataProducts}
              fetchData={fetchData}
              category="Man"
            />
          }
        />
        <Route
          path="/Woman/*"
          element={
            <CategoryPage
              data={dataProducts}
              fetchData={fetchData}
              category="Woman"
            />
          }
        />
        <Route
          path="/Kids/*"
          element={
            <CategoryPage
              data={dataProducts}
              fetchData={fetchData}
              category="Kids"
            />
          }
        />
        <Route
          path="/Panel-Admin"
          element={<Admin data={dataProducts} fetchData={fetchData} />}
        />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
