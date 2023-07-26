import { useState, useRef } from "react";
import { Products, forProps } from "../../App";
import { Link } from "react-router-dom";
import { useLikedProduct } from "../../hooks/likedProduct";
import { useAddProduct } from "../../hooks/addProductToBasket";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import SectionProducts from "../SectionProducts/SectionProducts";
import "../../commonStyle/sectionscss.scss";

const SectionWoman = ({ data, fetchData }: forProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { likedProduct } = useLikedProduct(fetchData);
  const { addProduct } = useAddProduct(fetchData);

  const productsForWoman = data;
  productsForWoman.sort((a: Products, b: Products) => a.id - b.id);

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
    <section className="section-woman-conteiner">
      <div className="section-woman-categories">
        <ul className="section-woman-list">
          <Link to={"/Woman"}>
            <li>Clothes</li>
          </Link>
          <Link to={"/Woman"}>
            <li>Shoes</li>
          </Link>
          <Link to={"/Woman"}>
            <li>Accessories</li>
          </Link>
        </ul>
      </div>
      <div className="section-woman-showcase">
        <p className="section-woman-showcase-img-title">Products For Women</p>
        <div className="section-woman-showcase-img" ref={containerRef}>
          {productsForWoman.map((product) => (
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

export default SectionWoman;
