 import logo from "../../assets/logo.png"
 import user from "../../assets/user.png"
 import heart from "../../assets/heart.png"
 import heartliked from "../../assets/heart-liked.png"
 import basketimg from "../../assets/basket.png"
 import basketfull from "../../assets/basket-full.png"
 import supabase from "../../supabase"
 import "./navbar.scss"
 import {Link} from "react-router-dom"
 import { useState , useEffect } from "react"

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


 const Navbar = ({ fetchData , data}:any) => {

    const [likedItems , setLikedItems] = useState(false)
    const [basket , setBasket] = useState(false)
    
    const dataLiked = data.filter((item:Products) => item.Isliked === true)
    const dataFromBasket = data.filter((item:Products) => item.InBasket === true)

    const liked = () => {
        setLikedItems(prev => !prev)
        setBasket(false)
    }
    const baskedCont = () => {
        setBasket(prev => !prev)
        setLikedItems(false)
    }
    const addProduct = async (id:number) => {
        let inbasket = data.find((elm:Products) => elm.id === id)?.InBasked 
        await supabase.from("Products").update({InBasket : !inbasket}).eq("id" , id)
        fetchData()
}
    const likedProduct = async (id:number) => {
        let liked = data.find((elm:Products) => elm.id === id)?.Isliked 
        await supabase.from("Products").update({Isliked : !liked}).eq("id" , id)
        fetchData()
    }
     
      
    
       const Prod = dataLiked.map((elm:Products) => { 
        return(
                <div className="liked-items-elements">
                    <img src={elm.img} alt="" className="liked-img"/>
                    <div className="liked-img-conteiner">
                        <p>{elm.Name}</p>
                        <div className="liked-icons">
                            {elm.InBasket ?<img src={basketfull} alt="basket" className="img-basked" onClick={() => addProduct(elm.id) } /> : <img src={basketimg} alt="basket" className="img-basked" onClick={() => addProduct(elm.id)}/>}
                            {elm.Isliked === true ? <img src={heartliked} alt="liked" className="img-liked" onClick={() => likedProduct(elm.id)} />:<img src={heart} alt="not liked" className="img-liked" onClick={() => (likedProduct(elm.id))} />}
                        </div>
                        
                    </div>
                </div>
            
        )})

        const ProdBasked = dataFromBasket.map((elm:Products) => { 
            return(
                    <div className="liked-items-elements">
                        <img src={elm.img} alt="" className="liked-img"/>
                        <div className="liked-img-conteiner">
                            <p>{elm.Name}</p>
                            <div className="liked-icons">
                                {elm.InBasket ?<img src={basketfull} alt="basket" className="img-basked" onClick={() => addProduct(elm.id) } /> : <img src={basketimg} alt="basket" className="img-basked" onClick={() => addProduct(elm.id)}/>}
                                {elm.Isliked === true ? <img src={heartliked} alt="liked" className="img-liked" onClick={() => likedProduct(elm.id)} />:<img src={heart} alt="not liked" className="img-liked" onClick={() => (likedProduct(elm.id))} />}
                            </div>
                            
                        </div>
                    </div>
                
            )})
        
    return(
    <>
         <section className="navbar-conteiner">
            <div className="navbar-elements">
                <div className="navbar-elements-person-conteiner">
                    <ul className="navbar-elements-person">
                        <Link to="/Man"><li>Man</li></Link>
                        <Link to="/Woman"><li>Woman</li></Link>
                        <Link to="/Kids"><li>Kids</li></Link>
                    </ul>
                </div>
                <div className="navbar-elements-logo">
                    <Link to="/"><img src={logo} alt="logo of website" /></Link>
                    <h1>AvShop</h1>
                </div>
                <div className="navbar-elements-panel">
                    <img src={basketimg} alt="basket" onClick={baskedCont}/>
                    <img src={heart} alt="liked items" onClick={liked}/>
                    <img src={user} alt="user panel" />
                </div>
            </div>
        </section>
        {likedItems ?
                <div className="list-liked-items">
                    <h1 className="liked-products-title">Liked Products</h1>
                    {Prod}
                </div>
            :
            <></>
        }
        {basket ?
                <div className="list-liked-items">
                    <h1 className="liked-products-title">Your Basked</h1>
                    {ProdBasked}
                </div>
            :
            <></>
        }
    </>
       
    )
 }

 export default Navbar