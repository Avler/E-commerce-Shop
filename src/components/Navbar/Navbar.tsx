import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Products, forProps } from "../../App";
import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import heart from "../../assets/heart.png";
import heartliked from "../../assets/heart-liked.png";
import basketimg from "../../assets/basket.png";
import basketfull from "../../assets/basket-full.png";
import close from "../../assets/close.png";
import RegisterForm from "./Register/RegisterForm";
import LoginFrom from "./LoginForm/LoginForm";
import menuHamburger from "../../assets/menu-open.png";
import ProdLiked from "./ProdLiked/ProdLiked";
import ProdBasket from "./ProdBasket/ProdBasket";
import "./style.scss";

const Navbar = ({ fetchData, data }: forProps) => {
  const [likedItems, setLikedItems] = useState(false);
  const [basket, setBasket] = useState(false);
  const [userPanel, setUserPanel] = useState(false);
  const [prize, setPrize] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [singedInPanel, setSingedInpanel] = useState(false);
  const [token, setToken] = useState<any>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [datasLiked, setDatasLiked] = useState<Products[]>([]);
  const [datasBasket, setDatasBasket] = useState<Products[]>([]);

  const dataLiked = data.filter((item: Products) => item.Isliked === true);
  const dataFromBasket = data.filter(
    (item: Products) => item.InBasket === true
  );
  useEffect(() => {
    setDatasLiked(dataLiked);
    setDatasBasket(dataFromBasket);
  }, []);

  const showProductFor = () => {
    fetchData();
  };

  const showHamburgerMenu = (parm: boolean) => {
    setShowMenu(parm);
    setLikedItems(false);
    setBasket(false);
    setUserPanel(false);
  };
  const liked = () => {
    setLikedItems((prev) => !prev);
    setBasket(false);
    setUserPanel(false);
    setShowMenu(false);
  };
  const baskedCont = () => {
    setBasket((prev) => !prev);
    setLikedItems(false);
    setUserPanel(false);
    setShowMenu(false);
  };
  const showUserPanel = () => {
    setUserPanel((prev) => !prev);
    setLikedItems(false);
    setBasket(false);
    setShowRegister(false);
    setSingedInpanel(true);
    setShowMenu(false);
  };
  const showLogin = () => {
    setShowRegister(false);
  };

  const prizeOfBasket = (object: { Prize: number }[]) => {
    let totalprize = 0;
    for (let i = 0; i < object.length; i++) {
      totalprize += object[i].Prize;
    }
    return totalprize;
  };
  const showReg = (item: boolean) => {
    setShowRegister(item);
  };
  const logIn = () => {
    setSingedInpanel(true);
  };
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    setSingedInpanel(false);
    setToken(false);
  };
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token")!);
      setToken(data);
    }
  }, []);

  useEffect(() => {
    const totalprize = prizeOfBasket(dataFromBasket);
    setPrize(totalprize);
  }, [dataFromBasket]);

  return (
    <>
      <section className="navbar-conteiner">
        <div className="navbar-elements">
          <div className="navbar-elements-person-conteiner">
            <ul className="navbar-elements-person">
              <Link to="/Man">
                <li onClick={() => showProductFor()}>Man</li>
              </Link>
              <Link to="/Woman">
                <li onClick={() => showProductFor()}>Woman</li>
              </Link>
              <Link to="/Kids">
                <li onClick={() => showProductFor()}>Kids</li>
              </Link>
            </ul>
            {showMenu ? (
              <img
                src={close}
                alt="close"
                onClick={() => showHamburgerMenu(false)}
                className="menu-close"
              />
            ) : (
              <img
                src={menuHamburger}
                alt="menu hamburger"
                className="menu-hamburger"
                onClick={() => showHamburgerMenu(true)}
              />
            )}
          </div>
          <div className="navbar-elements-logo">
            <Link to="/">
              <img
                src={logo}
                alt="logo of website"
                onClick={() => showProductFor()}
              />
            </Link>
            <h1>AvShop</h1>
          </div>
          <div className="navbar-elements-panel">
            <img src={user} alt="user panel" onClick={showUserPanel} />
            <img
              src={likedItems ? heartliked : heart}
              alt="liked items"
              onClick={liked}
            />
            <img
              src={basket ? basketfull : basketimg}
              alt="basket"
              onClick={baskedCont}
            />
          </div>
        </div>
      </section>
      {showMenu ? (
        <div className="cont-navbar-elements-person-menu">
          <ul className="navbar-elements-person-menu">
            <Link to="/Man">
              <li onClick={() => showHamburgerMenu(false)}>Man</li>
            </Link>
            <Link to="/Woman">
              <li onClick={() => showHamburgerMenu(false)}>Woman</li>
            </Link>
            <Link to="/Kids">
              <li onClick={() => showHamburgerMenu(false)}>Kids</li>
            </Link>
          </ul>
        </div>
      ) : (
        <></>
      )}
      {likedItems ? (
        <div className="list-liked-items">
          <h1 className="liked-products-title">Liked Products</h1>
          <ProdLiked
            datasLiked={datasLiked}
            setDatasLiked={setDatasLiked}
            fetchData={fetchData}
          />
        </div>
      ) : (
        <></>
      )}
      {basket ? (
        <div className="list-liked-items">
          <h1 className="liked-products-title">Shopping Cart</h1>
          <ProdBasket
            datasBasket={datasBasket}
            setDatasBasket={setDatasBasket}
            fetchData={fetchData}
          />
          <p className="basket-counter">Total Prize is: {prize} $</p>
          <button className="btn-buy">Buy Selected Products</button>
        </div>
      ) : (
        <></>
      )}
      {userPanel && singedInPanel && token ? (
        <div className="user-panel">
          <ul className="panel-logedin">
            <li className="list-logedin">My Account</li>
            <li className="list-logedin">Orders</li>
            <li className="list-logedin">Return the item</li>
            <li className="list-logedin">Help and contact</li>
            {token.user.id === "a8d449e1-b2ac-44e4-b5de-0e51bcf60db0" ? (
              <Link to="/Panel-Admin">
                <li className="list-logedin" onClick={showUserPanel}>
                  Admin Panel
                </li>
              </Link>
            ) : (
              <></>
            )}
          </ul>
          <button className="log-out-btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : userPanel ? (
        <div className="user-panel">
          {showRegister ? (
            <RegisterForm showlogin={showLogin} />
          ) : (
            <LoginFrom
              showReg={showReg}
              showPanel={showUserPanel}
              logIn={logIn}
              token={setToken}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
