import { Products } from "../../App";
import { useLikedProduct } from "../../hooks/likedProduct";
import { useAddProduct } from "../../hooks/addProductToBasket";
import { useState } from "react";
import heart from "../../assets/heart.png";
import heartliked from "../../assets/heart-liked.png";
import basket from "../../assets/basket.png";
import basketfull from "../../assets/basket-full.png";

export interface forPropsPagesProducts {
  data: Products[];
  fetchData: () => void;
  setDatas: React.Dispatch<React.SetStateAction<Products[]>>;
}

const PagesProducts = ({
  data,
  fetchData,
  setDatas,
}: forPropsPagesProducts) => {
  const { likedProduct } = useLikedProduct(fetchData);
  const { addProduct } = useAddProduct(fetchData);

  const Products = data.map((elm: Products) => {
    const handleLiked = (id: number) => {
      let liked = elm.Isliked;
      likedProduct(id);
      setDatas((elm) =>
        elm.map((element) => {
          return element.id === id ? { ...element, Isliked: !liked } : element;
        })
      );
    };
    const handleInBasket = (id: number) => {
      let basket = elm.InBasket;
      addProduct(id);
      setDatas((elm) =>
        elm.map((element) => {
          return element.id === id
            ? { ...element, InBasket: !basket }
            : element;
        })
      );
    };
    return (
      <div className="man-home-main-products-cont" key={elm.id}>
        <div className="img-conteiner">
          {elm.InBasket ? (
            <img
              src={basketfull}
              alt="basket"
              className="basket heart-img-animation"
              onClick={() => handleInBasket(elm.id)}
            />
          ) : (
            <img
              src={basket}
              alt="basket"
              className="basket"
              onClick={() => handleInBasket(elm.id)}
            />
          )}
          {elm.Isliked === true ? (
            <img
              src={elm.Isliked ? heartliked : heart}
              alt=""
              className="heart-img heart-img-animation"
              onClick={() => handleLiked(elm.id)}
            />
          ) : (
            <img
              src={heart}
              alt=""
              className="heart-img"
              onClick={() => handleLiked(elm.id)}
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
  return <>{Products}</>;
};

export default PagesProducts;
