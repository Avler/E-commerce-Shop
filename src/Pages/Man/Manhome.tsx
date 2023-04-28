import Navbar from "../../Components/Navbar/Navbar"
import { useState , useEffect} from "react";
import heart from "../../assets/heart.png"
import heartliked from "../../assets/heart-liked.png"
import { createClient } from "@supabase/supabase-js";
import basket from "../../assets/basket.png"
import basketfull from "../../assets/basket-full.png"
import "./Manhome.scss"
import supabase from "../../supabase";

interface Products {
    id: number;
    Category: string;
    For: string;
    Item: string;
    Name: string;
    Prize: number;
    img: string;
    Isliked: boolean;
    InBasket: boolean;
  }

const Manhome = ({data , fetchData}:any) => {

    const forMan = data.filter((elm:any) => elm.For === "Man")
    const [showCategory , setShowCategory] = useState(forMan)

    const [showlist, setShowList] = useState(false)
    const showListItems = (item:boolean) => {
            setShowList(item)  
            setShowList2(false)
    }
    const [showlist2, setShowList2] = useState(false)
    const showListItems2 = (item:boolean) => {
        setShowList2(item)
        setShowList(false)
    }
    

    
    const likedProduct = async (id:number) => {
        let liked = data.find((elm:Products) => elm.id === id)?.Isliked 
        await supabase.from("Products").update({Isliked : !liked}).eq("id" , id)
        fetchData()
    }
    const addProduct = async (id:number) => {
        let inbasket = forMan.find((elm:Products) => elm.id === id)?.InBasket 
        await supabase.from("Products").update({InBasket : !inbasket}).eq("id" , id)
        fetchData()
    }

    const changProducts = (item:string) => {
        let forManT = forMan.filter((elm:Products) => elm.Item === item)
        setShowCategory(forManT)
    }
   
    const Products = showCategory.map((elm:Products) => {
        return(
            <div className="man-home-main-products-cont">
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
        <section className="man-page">
            
            
            <div className="man-home-section">
                <div className="man-home-main">
                    <div className="man-page-overlist">
                        <h1 className="man-page-products">All Man Products</h1>
                        <h2 className="man-page-search">Search</h2>
                        <input className="search-input"></input>
                    </div>
                   
                    <ul className="main-list">
                        <li className="main-category" onClick={() => showListItems(true)}>Clothes
                        {showlist ? <ul className="sub-list">
                                <li className="sub-category" onClick={() => changProducts("T-shirt")}>T-shirt</li>
                                <li className="sub-category" onClick={() => changProducts("Shirts")}>Shirts</li>
                                <li className="sub-category" onClick={() => changProducts("Shorts")}>Shorts</li>
                                <li className="sub-category" onClick={() => changProducts("Hoodie")}>Hoodie</li>
                                <li className="sub-category" onClick={() => changProducts("Jeans")}>Jeans</li>
                            </ul>
                            :
                            <></>    
                        }
                            

                        </li>
                        <li className="main-category" onClick={() => showListItems2(true)}>Shoes
                        {showlist2 ? 
                            <ul className="sub-list2">
                                    <li className="sub-category" onClick={() => changProducts("Sneakers")}>Sneakers</li>
                                    <li className="sub-category" onClick={() => changProducts("Sport")}>Sport</li>
                                    <li className="sub-category" onClick={() => changProducts("Elegant")}>Elegant</li>
                            </ul>
                        :
                        <></>
                        }
                            
                        </li>
                        <li className="main-category">Accessories</li>
                        <li className="main-category">Cosmetics</li>
                    </ul>
                </div>
                <div className="man-home-main-product"> 
                    {Products}
                </div>
                
            </div>
        </section>
    )
}

export default Manhome