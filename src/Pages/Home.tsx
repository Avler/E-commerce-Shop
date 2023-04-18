import Navbar from "../Components/Navbar/Navbar"
import SectionMan from "../Components/Section-Man/Section-man"

interface Products {
    id: Number;
    Category: Text;
    For: Text;
    Item: Text;
    Name: Text;
    Prize: Number;
    img: Text;
  }

interface HomeProducts {
    data: Products[];
}

const Home = (props: HomeProducts) => {

    let data = props.data
    let dataMan = data.filter(item => item.For === "Man")
    console.log(dataMan)

    return(
        <div className="home-conteiner">
            <Navbar />
            <SectionMan />
        </div>
    )
}

export default Home