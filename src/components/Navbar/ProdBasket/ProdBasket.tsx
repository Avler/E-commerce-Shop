import { Products } from "../../../App";
import { useAddProduct } from "../../../hooks/addProductToBasket";
import close from "../../../assets/close.png";

interface typeBasket {
  fetchData: () => void;
  datasBasket: Products[];
  setDatasBasket: React.Dispatch<React.SetStateAction<Products[]>>;
}

const ProdBasket = ({ datasBasket, setDatasBasket, fetchData }: typeBasket) => {
  const { addProduct } = useAddProduct(fetchData);
  const handleAddToBaskett = (id: number) => {
    addProduct(id);
    const update = datasBasket.map((element) => {
      return element.id === id
        ? { ...element, InBasket: !element.InBasket }
        : element;
    });
    setDatasBasket(update);
  };
  const ProductBasket = datasBasket.map((elm: Products) => {
    return elm.InBasket ? (
      <div className="liked-items-elements" key={elm.id}>
        <img src={elm.img} alt="" className="liked-img" />
        <div className="liked-img-conteiner">
          <p>{elm.Name}</p>
          <p>Prize: {elm.Prize} $</p>
          <div className="liked-icons">
            <div className="liked-icons-cont">
              <img
                src={close}
                alt="liked"
                className="img-liked"
                onClick={() => handleAddToBaskett(elm.id)}
              />
              <p onClick={() => handleAddToBaskett(elm.id)}>Remove Item</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  });
  return <>{ProductBasket}</>;
};
export default ProdBasket;
