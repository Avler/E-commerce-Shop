import "./section-man.scss"
import heart from "../../assets/heart.png"
import heartliked from "../../assets/heart-liked.png"
import left from "../../assets/left.png"
import right from "../../assets/right.png"
import { useState , useEffect , useRef} from "react"

interface Products {
    id: number;
    Category: string;
    For: string;
    Item: string;
    Name: string;
    Prize: number;
    img: string;
    isliked:boolean;
  }

  interface HomeProducts {
    productsMan: Products[];
}
const SectionMan = (props: HomeProducts) => {

    const containerRef = useRef<HTMLDivElement>(null);

    const [productsMan , setProductsMan] = useState(props.productsMan)
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        setProductsMan(props.productsMan)
    }, [props.productsMan])

    const likedProduct = (id:number) => {
        let liked = productsMan.find(elm => elm.isliked)

       setProductsMan(elem => elem.map(elm => {
        return elm.id === id ? {...elm , isliked: !liked} : elm
    })) 
    }
    
    function handleLeftArrowClick() {
        containerRef.current!.scrollBy({
          left: -800,
          behavior: 'smooth',
        });
        setScrollLeft(containerRef.current!.scrollLeft - 200)
      }

    function handleRightArrowClick() {
        containerRef.current!.scrollBy({
          left: 800,
          behavior: 'smooth',
        });
        setScrollLeft(containerRef.current!.scrollLeft + 200)
      }

    const products = productsMan.map(elm =>  {
        return (
            
                <div>
                    <div className="img-conteiner">
                        {elm.isliked ? <img src={heartliked} alt="" className="heart-img" onClick={() => likedProduct(elm.id)} />:<img src={heart} alt="" className="heart-img" onClick={() => (likedProduct(elm.id))} />}
                        <img src={elm.img} alt="show case img " className="product-img"></img>
                    </div>
                    <div className="text-conteiner">
                        <p>{elm.Name}</p>
                        <p>Prize : {elm.Prize}$</p>
                    </div>
                    
                </div>
            
        )
    })

    return (
        <section className="section-man-conteiner">
            <div className="section-man-categories">
                <ul className="section-man-list">
                    <li>Clothes</li>
                    <li>Shoes</li>
                    <li>Accessories</li>
                    <li>Cosmetics</li>
                </ul>
            </div>
            <div className="section-man-showcase">
                <p className="section-man-showcase-img-title" >Products For Man</p>
                <div className="section-man-showcase-img" ref={containerRef}>
                    {products}
                    <img src={left} alt="" className="arrow-left" onClick={handleLeftArrowClick}/>
                    <img src={right} alt="" className="arrow-right" onClick={handleRightArrowClick}/>
                </div>
                
            </div>
        </section>
    )
}

export default SectionMan