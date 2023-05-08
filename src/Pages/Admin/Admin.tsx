
import "./admin.scss"
import { useState } from "react";
import AddNewItem from "./AddnewItem";
import close from "../../assets/close.png"
import edit from "../../assets/edit1.png"
import supabase from "../../supabase";
import EditItem from "./edititem";

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

const Admin = ({data , fetchData}:any) => {

    const [showAddItem , setShowAddItem] = useState(true)
    const [showEditItems , setShowEditItems] = useState(false)
    const [editItemsList , setEditItemsList] = useState(false)
    const [dataEdit , setDataEdit] = useState([
        {
        forwho: "",
        product_category: "",
        item_category: "",
        product_name: "",
        product_price: "",
        product_img: null,
        id: ""
    }])
  
    const showEdit = ()=> {
        setShowAddItem(false)
        setShowEditItems(true)
        setEditItemsList(false) 
    }
    const showAddItems = ()=> {
        setShowAddItem(true)
        setShowEditItems(false) 
        setEditItemsList(false)
    }
   
    
    const removeProduct =  async (id:any) => {
         await supabase
        .from('Products')
        .delete()
        .eq('id', id)
        fetchData()
    }

    const editItems = async(product:any) => {
        setDataEdit([{
            forwho: product.For,
            product_category: product.Category,
            item_category: product.Item,
            product_name: product.Name,
            product_price: product.Prize,
            product_img: product.img,
            id: product.id
        }])
        setShowAddItem(false)
        setShowEditItems(false) 
        setEditItemsList(true)
    }

    const Products = data.map((elm:Products) => {
        return(
            <div className="man-home-main-products-cont" id={elm.id} key={elm.id}>
                <div className="img-conteiner">
                        <img src={elm.img} alt="show case img " className="product-img"></img>
                </div>
                <div className="text-conteiner">
                    <div className="img-panel-cont">
                        <img src={edit} alt="edit items" onClick={() => editItems(elm)}/>
                        <img src={close} alt="remove item" onClick={() =>removeProduct(elm.id)}/>
                    </div>
                        
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
                    <li className="elm-list" onClick={showEdit}>Edit / Remove Items</li>
                    
                </ul>
            </div>
            <div className="section-panel-admin-form">
                 <div className="prod-cont1">
                   {showAddItem ? <AddNewItem fetchData ={fetchData}/> : <></>} 
                 </div>
                 <div className="prod-cont2">
                   {showEditItems ? Products : <></>} 
                   {editItemsList? <EditItem data={dataEdit} fetchData={fetchData} setDataEdit = {setDataEdit}/> : <></>}
                 </div>
            </div>
        </section>
    )
}


export default Admin