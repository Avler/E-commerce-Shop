import { useState } from "react";
import { Products, forProps } from "../../App";
import heart from "../../assets/heart.png";
import heartliked from "../../assets/heart-liked.png";
import basket from "../../assets/basket.png";
import basketfull from "../../assets/basket-full.png";
import supabase from "../../supabase";
import Searchbar from "../../components/SearchBar/SearchBar";
import "../../commonStyle/pages.scss";

const Kidshome = ({ data, fetchData }: forProps) => {
  const forKids = data.filter((elm: Products) => elm.For === "Kids");
  const [showCategory, setShowCategory] = useState(forKids);
  const [searchValue, setSearchValue] = useState("");
  const [showlist, setShowList] = useState(false);
  const [showlist2, setShowList2] = useState(false);
  const [showlist3, setShowList3] = useState(false);

  const showListItems = (item: boolean) => {
    setShowList(item);
    setShowList2(false);
    setShowList3(false);
  };
  const showListItems2 = (item: boolean) => {
    setShowList2(item);
    setShowList(false);
    setShowList3(false);
  };
  const showListItems3 = (item: boolean) => {
    setShowList3(item);
    setShowList(false);
    setShowList2(false);
  };

  const likedProduct = async (id: number) => {
    let liked = data.find((elm: Products) => elm.id === id)?.Isliked;
    await supabase.from("Products").update({ Isliked: !liked }).eq("id", id);
    fetchData();
    setShowCategory((prev: Products[]) =>
      prev.map((elm: Products) => {
        return elm.id === id ? { ...elm, Isliked: !liked } : elm;
      })
    );
  };
  const addProduct = async (id: number) => {
    let inbasket = forKids.find((elm: Products) => elm.id === id)?.InBasket;
    await supabase
      .from("Products")
      .update({ InBasket: !inbasket })
      .eq("id", id);
    fetchData();
    setShowCategory((prev: Products[]) =>
      prev.map((elm: Products) => {
        return elm.id === id ? { ...elm, InBasket: !inbasket } : elm;
      })
    );
  };

  const changProducts = (item: string) => {
    let forManT = forKids.filter((elm: Products) => elm.Item === item);
    setShowCategory(forManT);
  };
  const changProductsToAll = () => {
    setShowCategory(forKids);
  };

  const Products = showCategory.map((elm: Products) => {
    return (
      <div className="man-home-main-products-cont" key={elm.id}>
        <div className="img-conteiner">
          {elm.InBasket ? (
            <img
              src={basketfull}
              alt="basket"
              className="basket heart-img-animation"
              onClick={() => addProduct(elm.id)}
            />
          ) : (
            <img
              src={basket}
              alt="basket"
              className="basket"
              onClick={() => addProduct(elm.id)}
            />
          )}
          {elm.Isliked === true ? (
            <img
              src={heartliked}
              alt=""
              className="heart-img heart-img-animation"
              onClick={() => likedProduct(elm.id)}
            />
          ) : (
            <img
              src={heart}
              alt=""
              className="heart-img"
              onClick={() => likedProduct(elm.id)}
            />
          )}
          <img src={elm.img} alt="show case img " className="product-img"></img>
        </div>
        <div className="text-conteiner">
          <p>{elm.Name}</p>
          <p>Price : {elm.Prize}$</p>
        </div>
      </div>
    );
  });
  return (
    <section className="man-page">
      <div className="man-home-section">
        <div className="man-home-main">
          <div className="man-page-overlist">
            <h1 className="man-page-products" onClick={changProductsToAll}>
              All Kids Products
            </h1>
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
          <ul className="main-list">
            <li className="main-category" onClick={() => showListItems(true)}>
              Clothes
              {showlist ? (
                <ul className="sub-list">
                  <li
                    className="sub-category"
                    onClick={() => changProducts("T-shirt")}
                  >
                    T-shirt
                  </li>
                  <li
                    className="sub-category"
                    onClick={() => changProducts("Hoodie")}
                  >
                    Hoodie
                  </li>
                </ul>
              ) : (
                <></>
              )}
            </li>
            <li className="main-category" onClick={() => showListItems2(true)}>
              Shoes
              {showlist2 ? (
                <ul className="sub-list2">
                  <li
                    className="sub-category"
                    onClick={() => changProducts("Sneakers")}
                  >
                    Sneakers
                  </li>
                  <li
                    className="sub-category"
                    onClick={() => changProducts("Sport")}
                  >
                    Sport
                  </li>
                </ul>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
        <div className="man-home-main-product">{Products}</div>
      </div>
    </section>
  );
};

export default Kidshome;
