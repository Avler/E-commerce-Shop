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
    Isliked: boolean;
  }

interface HomeProducts {
    data: Products[];
}

const Home = (props: HomeProducts) => {

    let data = props.data
    let dataMan = data.filter(item => item.For === "Man")
    let dataLiked = data.filter(item => item.Isliked === true)
    
    
    return(
        <div className="home-conteiner">
            <Navbar data = {dataLiked}/>
            <SectionMan productsMan = {dataMan}/>
        </div>
    )
}

export default Home