 import logo from "../../assets/logo.png"
 import user from "../../assets/user.png"
 import heart from "../../assets/heart.png"
 import basket from "../../assets/basket.png"
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
  }

interface HomeProducts {
    data: Products[];
}

 const Navbar = (dataLiked) => {

    const [likedItems , setLikedItems] = useState(false)
    
    const liked = () => {
        setLikedItems(prev => !prev)
    }
   
       const dataLikedProducts = dataLiked.dataLiked
      
    console.log(dataLikedProducts)
       const Prod = dataLikedProducts.map(elm => { 
        return(
            <div>
                <img src={elm.img} alt="" className="liked-img"/>
            </div>
        )})
        
    return(
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
                    <img src={basket} alt="basket" />
                    <img src={heart} alt="liked items" onClick={liked}/>
                    <img src={user} alt="user panel" />
                </div>
            </div>
            {likedItems ?
                <div className="list-liked-items">
                    {Prod}
                </div>
            :
            <></>
            }
            
        </section>
    )
 }

 export default Navbar