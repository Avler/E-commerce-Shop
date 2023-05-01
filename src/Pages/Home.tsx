import Navbar from "../Components/Navbar/Navbar"
import SectionMan from "../Components/Section-Man/Section-man"
import {useSelector} from "react-redux"
import SectionWoman from "../Components/Section-Woman/Section-woman";
import SectionKids from "../Components/Section-Kids/Section-kids";

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


const Home = ({fetchData}:any) => {

    const products = useSelector((state:any)=>state.product.value.item)
    let data = products
   
    
    let dataMan = data.filter((item:Products) => item.For === "Man")
    let dataWoman = data.filter((item:Products) => item.For === "Woman")
    let dataKids = data.filter((item:Products) => item.For === "Kids")
   

    if(!data) return null

    
    return(
        <>
           
            <SectionMan productsMan = {dataMan} fetchData ={fetchData}/>
            <SectionWoman productsWoman = {dataWoman} fetchData={fetchData}/>
            <SectionKids productsKids = {dataKids} fetchData={fetchData} />
        </>
 
    )
}

export default Home