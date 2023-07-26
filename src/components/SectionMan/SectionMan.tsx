import { useState, useRef } from "react";
import { Products, forProps } from "../../App";
import { Link } from "react-router-dom";
import { useLikedProduct } from "../../hooks/likedProduct";
import { useAddProduct } from "../../hooks/addProductToBasket";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import SectionProducts from "../SectionProducts/SectionProducts";
import "../../commonStyle/sectionscss.scss";

const SectionMan = ({ data, fetchData }: forProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { likedProduct } = useLikedProduct(fetchData);
  const { addProduct } = useAddProduct(fetchData);

  const productsForMan = data;
  productsForMan.sort((a: Products, b: Products) => a.id - b.id);

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

  return (
    <section className="section-man-conteiner">
      <div className="section-man-categories">
        <ul className="section-man-list">
          <Link to={"/Man"}>
            <li>Clothes</li>
          </Link>
          <Link to={"/Man"}>
            <li>Shoes</li>
          </Link>
          <Link to={"/Man"}>
            <li>Accessories</li>
          </Link>
        </ul>
      </div>
      <div className="section-man-showcase">
        <p className="section-man-showcase-img-title">Products For Men</p>
        <div className="section-man-showcase-img" ref={containerRef}>
          {productsForMan.map((product) => (
            <SectionProducts
              key={product.id}
              product={product}
              fetchData={fetchData}
            />
          ))}
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

export default SectionMan;
