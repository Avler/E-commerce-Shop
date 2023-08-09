// CommonCategoryPage.js
import React, { useEffect, useState } from "react";
import { Products } from "../../App";
import { Link, useLocation, Outlet } from "react-router-dom";
import Searchbar from "../../components/SearchBar/SearchBar";
import PagesProducts from "../../components/PagesProducts/PagesProducts";
import PagesNavigation from "../../components/PagesNavigation/PagesNavigation";
import { useDispatch, useSelector } from "react-redux";
import "../../commonStyle/pages.scss";

export interface forPropsPages {
  data: Products[];
  category: string;
  fetchData: () => void;
}

const SubPage = ({ data, fetchData, category }: forPropsPages) => {
  const [subCategory, setSubCategory] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const dataProducts: Products[] = useSelector(
    (state: { product: { value: { item: Products[] } } }) =>
      state.product.value.item
  );

  useEffect(() => {
    const subCategoryFromURL = location.pathname.split("/").pop();
    setSubCategory(subCategoryFromURL!);
  }, [location.pathname]);

  // Filter products based on the selected subcategory
  let filteredProducts = data.filter((elm: Products) => elm.For === category);

  useEffect(() => {
    setDatas(filteredProducts);
  }, [category]);
  const [datas, setDatas] = useState<Products[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const changeProducts = (item: string) => {
    const updatedCategory = data.filter(
      (elm: Products) => elm.For === category && elm.Item === item
    );
    setDatas(updatedCategory);
  };

  const changProductsToAll = () => {
    fetchData();
    const updatedCategory = dataProducts.filter(
      (elm: Products) => elm.For === category
    );
    setDatas(updatedCategory);
  };

  return (
    <section className="man-page">
      <div className="man-home-section">
        <div className="man-home-main">
          <div className="man-page-overlist">
            <Link to={"/Man"}>
              <h1 className="man-page-products" onClick={changProductsToAll}>
                All Products
              </h1>
            </Link>
            <div className="search-cont">
              <h2 className="man-page-search">Search</h2>
              <div className="search-list">
                <input
                  className="search-input"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search Products"
                ></input>
                <Searchbar search={searchValue} data={data} />
              </div>
            </div>
          </div>
          <PagesNavigation
            data={data}
            category={category}
            fetchData={fetchData}
            changeProducts={changeProducts}
          />
        </div>
        <div className="man-home-main-product">
          <PagesProducts
            data={datas}
            fetchData={fetchData}
            setDatas={setDatas}
          />
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default SubPage;
