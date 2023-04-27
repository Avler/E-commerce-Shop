import "./admin.scss"

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

const Admin = ({data}:any) => {


    const allProducts = data

    const Products = data.map((elm:Products) => {
        return(
            <div className="man-home-main-products-cont">
                <div className="img-conteiner">
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
        <section className="section-panel-admin">
            <div className="section-panel-admin-list">
                <ul>
                    <li className="elm-list">Add New Item</li>
                    <li className="elm-list">Edit Items</li>
                    <li className="elm-list">Remove Item</li>
                </ul>
            </div>
            <div className="section-panel-admin-form">
                <h2 className="section-panel-admin-title">All Products</h2>
                 <div className="prod-cont">
                    {Products}
                 </div>
            </div>
        </section>
    )
}


export default Admin