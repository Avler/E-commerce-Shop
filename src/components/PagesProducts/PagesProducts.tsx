import { forProps, Products } from "../../App";
import { useLikedProduct } from "../../hooks/likedProduct";
import { useAddProduct } from "../../hooks/addProductToBasket";
import heart from "../../assets/heart.png";
import heartliked from "../../assets/heart-liked.png";
import basket from "../../assets/basket.png";
import basketfull from "../../assets/basket-full.png";

const PagesProducts = ({ data, fetchData }: forProps) => {
  const { likedProduct } = useLikedProduct(fetchData);
  const { addProduct } = useAddProduct(fetchData);

  const Products = data.map((elm: Products) => {
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
  return <>{Products}</>;
};

export default PagesProducts;
