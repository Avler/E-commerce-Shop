import "./footer.scss"
import dhl from "../../assets/dhl.png"
import fedex from "../../assets/fedex.png"
import ups from "../../assets/ups.png"
import visa from "../../assets/visa.png"
import mastercard from "../../assets/mastercard.png"
import paypal from "../../assets/paypal.png"
import przelewy24 from "../../assets/przelewy24.png"
import appstore from "../../assets/appstore.png"
import googleplay from "../../assets/googleplay.png"
import facebook from "../../assets/facebook.png"
import instagram from "../../assets/instagram.png"
import print from "../../assets/pinterest.png"
import twitter from "../../assets/twitter.png"
import card from "../../assets/credit-card.png"
import truck from "../../assets/truck.png"
import question from "../../assets/question.png"

const Footer = () => {
    return(
        <section className="footer-conteriner">
            <div className="footer-conteriner-one">
                <div className="footer-element">
                    <h2><img src={truck} alt="truck" className="title-icon"/>Our partners</h2>
                    <div className="footer-element-img">
                        <img src={dhl} alt="dhl" className="footer-img"/>
                        <img src={fedex} alt="dhl" className="footer-img"/>
                        <img src={ups} alt="dhl" className="footer-img"/>   
                    </div>
                </div>
                <div className="footer-element">
                    <h2><img src={card} alt="card" className="title-icon"/>Payment methods</h2>
                    <div className="footer-element-img">
                        <img src={visa} alt="visa" className="footer-img"/>
                        <img src={paypal} alt="paypal" className="footer-img"/>
                        <img src={przelewy24} alt="przelewy24" className="footer-img"/>
                        <img src={mastercard} alt="mastercard" className="footer-img"/>
                    </div>
                </div>
                <div className="footer-element">
                    <h2><img src={question} alt="question mark" className="title-icon-question"/>Help and contact</h2>
                    <div className="cont-list-footer">
                        <ul className="list-footer">
                            <li>Shipment tracking</li>
                            <li>Payment methods</li>
                            <li>Return procedure</li>
                            <li>Subscribe to the newsletter</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-conteriner-two">
                <div className="footer-element-two">
                    <h2>Information</h2>
                   <div  className="cont-list-footer">
                    <ul className="list-footer">
                            <li>Company's data</li>
                            <li>Statute</li>
                            <li>Privacy policy</li>
                            <li>Tech blog</li>
                        </ul>
                   </div>
                </div>
                <div className="footer-element-two">
                    <h2>Application Av Shop</h2>
                    <div className="footer-element-two-app">
                        <img src={appstore} alt="app store" className="img-app1"/>
                        <img src={googleplay} alt="google play" className="img-app"/>
                    </div>
                </div>
                <div className="footer-element-two">
                    <h2>Find more inspiration</h2>
                    <div>
                        <img src={facebook} alt="facebook" className="img-social"/>
                        <img src={twitter} alt="twitter" className="img-social"/>
                        <img src={instagram} alt="instagram" className="img-social"/>
                        <img src={print} alt="pinterest" className="img-social"/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer