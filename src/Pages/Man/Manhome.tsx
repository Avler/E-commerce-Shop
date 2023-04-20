import Navbar from "../../Components/Navbar/Navbar"
import { useState , useEffect} from "react";
import heart from "../../assets/heart.png"
import heartliked from "../../assets/heart-liked.png"
import { createClient } from "@supabase/supabase-js";
import "./Manhome.scss"

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
    Isliked: boolean;
  }

interface HomeProducts {
    data: Products[];
}

const Manhome = (props: HomeProducts) => {

    useEffect(() => {
        setProductsMans(props.data)
    }, [props.data])
    const [productsMans , setProductsMans] = useState(props.data)
    const forMan = productsMans.filter(elm => elm.For === "Man")
    
    console.log(forMan)
    const likedProduct = async (id:number) => {
        let liked = productsMans.find(elm => elm.id === id)?.Isliked 

       setProductsMans(elem => elem.map(elm => {
        return elm.id === id ? {...elm , Isliked: !elm.Isliked} : elm
    })) 
   await supabase.from("Products").update({Isliked : !liked}).eq("id" , id)
  
}

    const allManProducts = forMan.map(elm => {
        return(
            <div className="man-home-main-products-cont">
                <div className="img-conteiner">
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

    return(
        <section className="man-page">
            <Navbar />
            
            <div className="man-home-section">
                <div className="man-home-main">
                    <div className="man-page-overlist">
                        <h1 className="man-page-products">All Man Products</h1>
                        <h2 className="man-page-search">Search</h2>
                        <input className="search-input"></input>
                    </div>
                   
                    <ul className="main-list">
                        <li className="main-category">Clothes
                            <ul className="sub-list">
                                <li className="sub-category">T-shirt</li>
                                <li className="sub-category">Shirts</li>
                                <li className="sub-category">Shorts</li>
                                <li className="sub-category">Hoodie</li>
                                <li className="sub-category">Jeans</li>
                            </ul>

                        </li>
                        <li className="main-category">Shoes
                            <ul className="sub-list">
                                <li className="sub-category">Sneakers</li>
                                <li className="sub-category">Sport</li>
                                <li className="sub-category">Elegant</li>
                            </ul>
                        </li>
                        <li className="main-category">Accessories</li>
                        <li className="main-category">Cosmetics</li>
                    </ul>
                </div>
                <div className="man-home-main-product"> 
                    {allManProducts}
                </div>
                
            </div>
        </section>
    )
}

export default Manhome