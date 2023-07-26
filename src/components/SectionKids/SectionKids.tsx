import { useState, useRef } from "react";
import { Products, forProps } from "../../App";
import { Link } from "react-router-dom";
import left from "../../assets/left.png";
import right from "../../assets/right.png";
import SectionProducts from "../SectionProducts/SectionProducts";
import "../../commonStyle/sectionscss.scss";

const SectionKids = ({ data, fetchData }: forProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const productsForKids = data;
  productsForKids.sort((a: Products, b: Products) => a.id - b.id);

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
          {productsForKids.map((product) => (
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

export default SectionKids;
