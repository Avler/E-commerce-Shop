import "./section-man.scss"
import s from "../../assets/s.png"

const SectionMan = () => {
    return (
        <section className="section-man-conteiner">
            <div className="section-man-categories">
                <ul className="section-man-list">
                    <li>Clothes</li>
                    <li>Shoes</li>
                    <li>Accessories</li>
                    <li>Cosmetics</li>
                </ul>
            </div>
            <div className="section-man-showcase">
                <p className="section-man-showcase-adds">This might catch your eye </p>
                <div className="section-man-showcase-img">
                    <p className="section-man-showcase-img-title" >For Man</p>
                    <div>
                        <img src={s} alt="show case img " />
                        <p>Nazwa productu</p>
                        <p>Cenna : 200zł</p>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default SectionMan