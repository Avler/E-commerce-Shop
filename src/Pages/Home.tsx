import Navbar from "../Components/Navbar/Navbar"
import SectionMan from "../Components/Section-Man/Section-man"

interface Products {
    id: number;
    Category: string;
    For: string;
    Item: string;
    Name: string;
    Prize: number;
    img: string;
    isliked: boolean;
  }

interface HomeProducts {
    data: Products[];
}

const Home = (props: HomeProducts) => {

    let data = props.data
    let dataMan = data.filter(item => item.For === "Man")
    
    
    return(
        <div className="home-conteiner">
            <Navbar />
            <SectionMan productsMan = {dataMan}/>
        </div>
    )
}

export default Home