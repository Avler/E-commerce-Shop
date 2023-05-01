import "./section-woman.scss"
import heart from "../../assets/heart.png"
import heartliked from "../../assets/heart-liked.png"
import basket from "../../assets/basket.png"
import basketfull from "../../assets/basket-full.png"
import left from "../../assets/left.png"
import right from "../../assets/right.png"
import { useState , useEffect , useRef, ObjectHTMLAttributes, FunctionComponent} from "react"
import { Link } from "react-router-dom"
import supabase from "../../supabase"


interface Products {
    id: number;
    Category: string;
    For: string;
    Item: string;
    Name: string;
    Prize: number;
    img: string;
    Isliked:boolean;
    InBasket:boolean;
  }

const SectionWoman = ({productsWoman , fetchData}:any) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    

    const productsForWoman = productsWoman
   
    

    const likedProduct = async (id:number) => {
        let liked = productsForWoman.find((elm:Products) => elm.id === id)?.Isliked 
        await supabase.from("Products").update({Isliked : !liked}).eq("id" , id)
        fetchData()
    }
    const addProduct = async (id:number) => {
        let inbasket = productsForWoman.find((elm:Products) => elm.id === id)?.InBasket 
        await supabase.from("Products").update({InBasket : !inbasket}).eq("id" , id)
        fetchData()
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
          left: 1500,
          behavior: 'smooth',
        });
        setScrollLeft(containerRef.current!.scrollLeft - 200)
      }

    const products = productsForWoman.map((elm:Products) =>  {
        return (
            
                <div key={elm.id}>
                    <div className="img-conteiner">
                        {elm.InBasket ?<img src={basketfull} alt="basket" className="basket" onClick={() => addProduct(elm.id) } /> : <img src={basket} alt="basket" className="basket" onClick={() => addProduct(elm.id)}/>}
                        {elm.Isliked === true ? <img src={heartliked} alt="" className="heart-img" onClick={() => likedProduct(elm.id)} />:<img src={heart} alt="" className="heart-img" onClick={() => (likedProduct(elm.id))} />}
                        <img src={elm.img} alt="show case img " className="product-img"></img>
                    </div>
                    <div className="text-conteiner">
                        <p>{elm.Name}</p>
                        <p>Price : {elm.Prize}$</p>
                    </div>
                    
                </div>
            
        )
    })
    return(
        <section className="section-woman-conteiner">
            <div className="section-woman-categories">
                <ul className="section-woman-list">
                    <Link to={"/Woman"}><li>Clothes</li></Link>
                    <Link to={"/Woman"}><li>Shoes</li></Link>
                    <Link to={"/Woman"}><li>Accessories</li></Link>
                    
                </ul>
            </div>
            <div className="section-woman-showcase">
                <p className="section-woman-showcase-img-title" >Products For Woman</p>
                <div className="section-woman-showcase-img" ref={containerRef}>
                    {products}
                    <img src={left} alt="" className="arrow-left" onClick={handleLeftArrowClick}/>
                    <img src={right} alt="" className="arrow-right" onClick={handleRightArrowClick}/>
                </div>
                
            </div>
        </section>
    )
}

export default SectionWoman