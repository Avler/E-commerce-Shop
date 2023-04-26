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
 import RegisterForm from "./Register/RegisterFrom"
 import LoginFrom from "./UserLog/LoginForm"

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
    const [userPanel, setUserPanel] = useState(false)
    const [prize , setPrize] = useState(0)
    const [showRegister , setShowRegister] = useState(false)
    
    const dataLiked = data.filter((item:Products) => item.Isliked === true)
    const dataFromBasket = data.filter((item:Products) => item.InBasket === true)

    const liked = () => {
        setLikedItems(prev => !prev)
        setBasket(false)
        setUserPanel(false)
    }
    const baskedCont = () => {
        setBasket(prev => !prev)
        setLikedItems(false)
        setUserPanel(false)
    }

    const showUserPanel = () => {
        setUserPanel(prev => !prev)
        setLikedItems(false)
        setBasket(false)
        setShowRegister(false)
    }
    const showLogin = () => {
        setShowRegister(false)
    }
    const prizeOfBasket = (object:any) => {
        let totalprize = 0 
        for (let i=0; i < object.length ; i++) {
            totalprize += object[i].Prize;
        }
        return totalprize
    }
   
    const showReg = (item:boolean) => {
        setShowRegister(item)
    }
    
    useEffect(() => {
        const totalprize = prizeOfBasket(dataFromBasket)
        setPrize(totalprize)
    }, [dataFromBasket])
    
    const addProduct = async (id:number) => {
        let inbasket = data.find((elm:Products) => elm.id === id)?.InBasket 
        await supabase.from("Products").update({InBasket : !inbasket}).eq("id" , id)
        fetchData()
}
    const likedProduct = async (id:number) => {
        let liked = data.find((elm:Products) => elm.id === id)?.Isliked 
        await supabase.from("Products").update({Isliked : !liked}).eq("id" , id)
        fetchData()
    }
     
      
    
    const ProdLiked = dataLiked.map((elm:Products) => { 
        return(
                <div className="liked-items-elements">
                    <img src={elm.img} alt="" className="liked-img"/>
                    <div className="liked-img-conteiner">
                        <p>{elm.Name}</p>
                        <p>Prize: {elm.Prize} $</p>
                        <div className="liked-icons">
                            {elm.InBasket ?<img src={basketfull} alt="basket" className="img-basked" onClick={() => addProduct(elm.id) } /> : <img src={basketimg} alt="basket" className="img-basked" onClick={() => addProduct(elm.id)}/>}
                            {elm.Isliked === true ? <img src={heartliked} alt="liked" className="img-liked" onClick={() => likedProduct(elm.id)} />:<img src={heart} alt="not liked" className="img-liked" onClick={() => (likedProduct(elm.id))} />}
                        </div>
                        
                    </div>
                </div>
            
        )})

    const ProdBasket = dataFromBasket.map((elm:Products) => { 
            return(
                    <div className="liked-items-elements">
                        <img src={elm.img} alt="" className="liked-img"/>
                        <div className="liked-img-conteiner">
                            <p>{elm.Name}</p>
                            <p>Prize: {elm.Prize} $</p>
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
                    <img src={user} alt="user panel" onClick={showUserPanel} />
                    <img src={heart} alt="liked items" onClick={liked}/>
                    <img src={basketimg} alt="basket" onClick={baskedCont}/>
                </div>
            </div>
        </section>
        {likedItems ?
                <div className="list-liked-items">
                    <h1 className="liked-products-title">Liked Products</h1>
                    {ProdLiked }
                </div>
            :
            <></>
        }
        {basket ?
                <div className="list-liked-items">
                    <h1 className="liked-products-title">Shopping Cart</h1>
                    {ProdBasket}
                    <p className="basket-counter">Total Prize is: {prize} $</p>
                </div>
            :
            <></>
        }
        {userPanel ? 
            <div className="user-panel">
                {showRegister ? 
                
                <RegisterForm showlogin= {showLogin}/>
                : 
                <LoginFrom showReg = {showReg}/>
                } 
               
            </div>
        : <></>}
    </>
       
    )
 }

 export default Navbar