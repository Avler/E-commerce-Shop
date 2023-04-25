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

const Home = ({fetchData}:any) => {

    const products = useSelector((state:any)=>state.product.value.item)
    let data = products
   
    
    let dataMan = data.filter((item:Products) => item.For === "Man")
    let dataLiked = data.filter((item:Products) => item.Isliked === true)
   

    if(!data) return null

    
    return(
        <>
           
            <SectionMan productsMan = {dataMan} fetchData ={fetchData}/>
        </>
 
    )
}

export default Home