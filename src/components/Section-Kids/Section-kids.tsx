import "../sectionscss.scss";
import heart from "../../assets/heart.png";
import heartliked from "../../assets/heart-liked.png";
import basket from "../../assets/basket.png";
import basketfull from "../../assets/basket-full.png";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase";
import { Products, forProps } from "../../App";

const SectionKids = ({ data, fetchData }: forProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const productsForKids = data;
  productsForKids.sort((a: Products, b: Products) => a.id - b.id);

  const likedProduct = async (id: number) => {
    let liked = productsForKids.find((elm: Products) => elm.id === id)?.Isliked;
    await supabase.from("Products").update({ Isliked: !liked }).eq("id", id);
    fetchData();
  };
  const addProduct = async (id: number) => {
    let inbasket = productsForKids.find(
      (elm: Products) => elm.id === id
    )?.InBasket;
    await supabase
      .from("Products")
      .update({ InBasket: !inbasket })
      .eq("id", id);
    fetchData();
  };
  function handleLeftArrowClick() {
    containerRef.current!.scrollBy({
      left: -800,
      behavior: "smooth",
    });
    setScrollLeft(containerRef.current!.scrollLeft - 200);
  }
  function handleRightArrowClick() {
    containerRef.current!.scrollBy({
      left: 1500,
      behavior: "smooth",
    });
    setScrollLeft(containerRef.current!.scrollLeft - 200);
  }
  const products = productsForKids.map((elm: Products) => {
    return (
      <div key={elm.id}>
        <div className="img-conteiner">
          {elm.InBasket ? (
            <img
              src={basketfull}
              alt="basket"
              className="basket"
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
              alt="heart"
              className={
                elm.Isliked ? "heart-img heart-img-animation" : "heart-img"
              }
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
    <section className="section-kids-conteiner">
      <div className="section-kids-categories">
        <ul className="section-kids-list">
          <Link to={"/Kids"}>
            <li>Clothes</li>
          </Link>
          <Link to={"/Kids"}>
            <li>Shoes</li>
          </Link>
        </ul>
      </div>
      <div className="section-kids-showcase">
        <p className="section-kids-showcase-img-title">Products For Kids</p>
        <div className="section-kids-showcase-img" ref={containerRef}>
          {products}
          <img
            src={left}
            alt=""
            className="arrow-left"
            onClick={handleLeftArrowClick}
          />
          <img
            src={right}
            alt=""
            className="arrow-right"
            onClick={handleRightArrowClick}
          />
        </div>
      </div>
    </section>
  );
};

export default SectionKids;
