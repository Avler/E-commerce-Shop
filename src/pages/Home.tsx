import SectionMan from "../components/Section-Man/Section-man";
import { useSelector } from "react-redux";
import SectionWoman from "../components/Section-Woman/Section-woman";
import SectionKids from "../components/Section-Kids/Section-kids";
import { Products } from "../App";

const Home = ({ fetchData }: { fetchData: () => void }) => {
  const products = useSelector((state: any) => state.product.value.item);
  let data = products;

  let dataMan = data.filter((item: Products) => item.For === "Man");
  let dataWoman = data.filter((item: Products) => item.For === "Woman");
  let dataKids = data.filter((item: Products) => item.For === "Kids");

  if (!data) return null;

  return (
    <>
      <SectionMan data={dataMan} fetchData={fetchData} />
      <SectionWoman data={dataWoman} fetchData={fetchData} />
      <SectionKids data={dataKids} fetchData={fetchData} />
    </>
  );
};

export default Home;
