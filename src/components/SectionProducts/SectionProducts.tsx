import React, { useEffect, useState } from "react";
import { Products } from "../../App";
import { useLikedProduct } from "../../hooks/likedProduct";
import { useAddProduct } from "../../hooks/addProductToBasket";
import { useSelector, useDispatch } from "react-redux";
import heart from "../../assets/heart.png";
import heartliked from "../../assets/heart-liked.png";
import basket from "../../assets/basket.png";
import basketfull from "../../assets/basket-full.png";
import { getAllProducts } from "../../redux/features/productSlice";
import "../../commonStyle/sectionscss.scss";
interface fetch {
  fetchData: () => void;
}

const SectionProducts = ({
  product,
  fetchData,
}: { product: Products } & fetch) => {
  const { likedProduct } = useLikedProduct(fetchData);
  const { addProduct } = useAddProduct(fetchData);
  const dispatch = useDispatch();

  const dataProducts: Products[] = useSelector(
    (state: { product: { value: { item: Products[] } } }) =>
      state.product.value.item
  );

  const handleLiked = (id: number) => {
    likedProduct(id);
    const update = dataProducts.map((element) => {
      return element.id === id
        ? { ...element, Isliked: !element.Isliked }
        : element;
    });
    dispatch(getAllProducts({ item: update }));
  };
  const handleAddToBasket = (id: number) => {
    addProduct(id);
    const update = dataProducts.map((element) => {
      return element.id === id
        ? { ...element, InBasket: !element.InBasket }
        : element;
    });
    dispatch(getAllProducts({ item: update }));
  };
  return (
    <div key={product.id}>
      <div className="img-conteiner">
        {product.InBasket ? (
          <img
            src={basketfull}
            alt="basket"
            className="basket"
            onClick={() => handleAddToBasket(product.id)}
          />
        ) : (
          <img
            src={basket}
            alt="basket"
            className="basket"
            onClick={() => handleAddToBasket(product.id)}
          />
        )}
        {product.Isliked ? (
          <img
            src={heartliked}
            alt="heart"
            className="heart-img heart-img-animation"
            onClick={() => handleLiked(product.id)}
          />
        ) : (
          <img
            src={heart}
            alt=""
            className="heart-img"
            onClick={() => handleLiked(product.id)}
          />
        )}
        <img
          src={product.img}
          alt="showcase img"
          className="product-img"
          loading="lazy"
        />
      </div>
      <div className="text-conteiner">
        <p>{product.Name}</p>
        <p>Price : {product.Prize}$</p>
      </div>
    </div>
  );
};

export default SectionProducts;
