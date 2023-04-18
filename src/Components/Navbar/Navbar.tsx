 import logo from "../../assets/logo.png"
 import user from "../../assets/user.png"
 import heart from "../../assets/heart.png"
 import basket from "../../assets/basket.png"
 import "./navbar.scss"

 const Navbar = () => {
    return(
        <section className="navbar-conteiner">
            <div className="navbar-elements">
                <div className="navbar-elements-person-conteiner">
                    <ul className="navbar-elements-person">
                        <li>Man</li>
                        <li>Woman</li>
                        <li>Kids</li>
                    </ul>
                </div>
                <div className="navbar-elements-logo">
                    <img src={logo} alt="logo of website" />
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