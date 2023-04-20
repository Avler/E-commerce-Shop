 import logo from "../../assets/logo.png"
 import user from "../../assets/user.png"
 import heart from "../../assets/heart.png"
 import basket from "../../assets/basket.png"
 import "./navbar.scss"
 import {Link} from "react-router-dom"

 const Navbar = () => {
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
                    <img src={heart} alt="liked items" />
                    <img src={user} alt="user panel" />
                </div>
            </div>
        </section>
    )
 }

 export default Navbar