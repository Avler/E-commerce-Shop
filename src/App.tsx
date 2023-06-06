import supabase from "./supabase";
import { useEffect } from "react";
import Home from "./pages/Home";
import "./main.scss";
import { Route, Routes, Navigate } from "react-router-dom";
import Manhome from "./pages/Man/Manhome";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "./redux/features/productSlice";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/admin/Admin";
import Footer from "./components/Footer/Footer";
import Womanhome from "./pages/Woman/Womanhome";
import Kidshome from "./pages/Kids/Kidshome";

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

  return (
    <>
      <Navbar fetchData={fetchData} data={dataProducts} />
      <Routes>
        <Route index element={<Home fetchData={fetchData} />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
        <Route
          path="/Man"
          element={<Manhome data={dataProducts} fetchData={fetchData} />}
        ></Route>
        <Route
          path="/Woman"
          element={<Womanhome data={dataProducts} fetchData={fetchData} />}
        ></Route>
        <Route
          path="/Kids"
          element={<Kidshome data={dataProducts} fetchData={fetchData} />}
        ></Route>
        <Route
          path="/Panel-Admin"
          element={<Admin data={dataProducts} fetchData={fetchData} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
