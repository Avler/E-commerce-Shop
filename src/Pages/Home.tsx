import Navbar from "../Components/Navbar/Navbar"
import SectionMan from "../Components/Section-Man/Section-man"
import {useSelector} from "react-redux"

interface Products {
    id: number;
    Category: string;
    For: string;
    Item: string;
    Name: string;
    Prize: number;
    img: string;
    Isliked: boolean;
  }

interface HomeProducts {
    data: Products[];
}

const Home = () => {

    const products = useSelector((state)=>state.product.value.item)
    let data = products

   
    
    let dataMan = data.filter(item => item.For === "Man")
    let dataLiked = data.filter(item => item.Isliked === true)
    
    if(!data) return null
    return(
        <>
           
            <SectionMan productsMan = {dataMan}/>
        </>
 
    )
}

export default Home