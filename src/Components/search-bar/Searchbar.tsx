import { Link } from "react-router-dom";
import "./search.scss"
import { Products } from "../../App";

const Searchbar = ({search,data}:any) => {
    return(
        <>
           <ul className={"searchList"}>
                     {
                         data.filter((product:Products) => {
                             if(search == "") {
                                 return product
                             } else if(product.Name.toLowerCase().includes(search.toLowerCase())){
                                 return product;
                             }
                         }).map((product:Products)=>
                             search === "" ? null : <Link to={`/products?type=${product.Name}`} key={product.id} className={"list-item"} >
                                 <span>{product.Name}</span>
                                 <img src={product.img}/>
                             </Link>
                         )
                     }
                 </ul>
        </>
    )
}

export default Searchbar