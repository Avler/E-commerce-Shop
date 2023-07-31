import { useEffect, useState } from "react";
import { forPropsPages } from "../../pages/categoryPages/CategoryPages";
import { Link, useLocation } from "react-router-dom";
import { Products } from "../../App";
import "../../commonStyle/pages.scss";

export interface forPropsPagesNav {
  data: Products[];
  category: string;
  fetchData: () => void;
  changeProducts: (item: string) => void;
}

const PagesNavigation = ({
  data,
  category,
  changeProducts,
}: forPropsPagesNav) => {
  const [dataNav, setDataNav] = useState<string[]>([]);

  const [subCategory, setSubCategory] = useState("");
  const location = useLocation();

  useEffect(() => {
    const subCategoryFromURL = location.pathname.split("/").pop();
    setSubCategory(subCategoryFromURL!);
  }, [location.pathname]);

  const routingCatergory = dataNav.map((elm) => {
    let active;
    if (subCategory === elm) {
      active = "main-category-active";
    } else active = "main-category";
    return (
      <Link to={`/${category}/${elm}`} key={elm}>
        <li className={active} onClick={() => changeProducts(elm)}>
          {elm}
        </li>
      </Link>
    );
  });
  useEffect(() => {
    let dataCategories = [
      ...new Set(
        data.filter((elm) => elm.For === category).map((elm) => elm.Item)
      ),
    ];
    setDataNav(dataCategories);
  }, [category]);
  return <ul className="main-list">{routingCatergory}</ul>;
};
export default PagesNavigation;
