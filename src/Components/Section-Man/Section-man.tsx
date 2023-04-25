import "./section-man.scss"
import heart from "../../assets/heart.png"
import heartliked from "../../assets/heart-liked.png"
import basket from "../../assets/basket.png"
import basketfull from "../../assets/basket-full.png"
import left from "../../assets/left.png"
import right from "../../assets/right.png"
import { useState , useEffect , useRef, ObjectHTMLAttributes, FunctionComponent} from "react"
import { createClient } from "@supabase/supabase-js"
import { Link } from "react-router-dom"


const supabaseUrl = "https://ejvptagpazmojxlvmjqa.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdnB0YWdwYXptb2p4bHZtanFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0MDY5MjIsImV4cCI6MTk5Njk4MjkyMn0.0nFGE0d_fZhmG4fwMs2k9UoLd5ySAPpZI55ZWPDd1Dc"
const supabase = createClient(supabaseUrl, supabaseKey)


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

const SectionMan = ({productsMan , fetchData}:any) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    

    const productsForMan = productsMan
   
    

    const likedProduct = async (id:number) => {
        let liked = productsForMan.find((elm:Products) => elm.id === id)?.Isliked 
        await supabase.from("Products").update({Isliked : !liked}).eq("id" , id)
        fetchData()
    }
    const addProduct = async (id:number) => {
        let inbasket = productsForMan.find((elm:Products) => elm.id === id)?.InBasket 
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

    const products = productsForMan.map((elm:Products) =>  {
        return (
            
                <div key={elm.id}>
                    <div className="img-conteiner">
                        {elm.InBasket ?<img src={basketfull} alt="basket" className="basket" onClick={() => addProduct(elm.id) } /> : <img src={basket} alt="basket" className="basket" onClick={() => addProduct(elm.id)}/>}
                        {elm.Isliked === true ? <img src={heartliked} alt="" className="heart-img" onClick={() => likedProduct(elm.id)} />:<img src={heart} alt="" className="heart-img" onClick={() => (likedProduct(elm.id))} />}
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
                    <Link to={"/Man"}><li>Clothes</li></Link>
                    <Link to={"/Man"}><li>Shoes</li></Link>
                    <Link to={"/Man"}><li>Accessories</li></Link>
                    <Link to={"/Man"}><li>Cosmetics</li></Link>
                    
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