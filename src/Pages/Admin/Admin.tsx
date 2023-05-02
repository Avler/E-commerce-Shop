
import "./admin.scss"
import { useState } from "react";
import AddNewItem from "./AddnewItem";


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

    const [showAddItem , setShowAddItem] = useState(true)
    const [showEditItems , setShowEditItems] = useState(false)
    const [showRemoveItems , setShowRemovesItems] = useState(false)
    

    const showEdit = ()=> {
        setShowAddItem(false)
        setShowEditItems(true) 
    }
    const showAddItems = ()=> {
        setShowAddItem(true)
        setShowEditItems(false) 
    }
    const Products = data.map((elm:Products) => {
        return(
            <div className="man-home-main-products-cont">
                <div className="img-conteiner">
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
        <section className="section-panel-admin">
            <div className="section-panel-admin-list">
                <ul>
                    <li className="elm-list" onClick={showAddItems}>Add New Item</li>
                    <li className="elm-list" onClick={showEdit}>Edit Items</li>
                    <li className="elm-list">Remove Item</li>
                </ul>
            </div>
            <div className="section-panel-admin-form">
                <h2 className="section-panel-admin-title">All Products</h2>
                 <div className="prod-cont">
                   {showAddItem ? <AddNewItem /> : <></>} 
                   {showEditItems ? Products : <></>} 
                 </div>
            </div>
        </section>
    )
}


export default Admin