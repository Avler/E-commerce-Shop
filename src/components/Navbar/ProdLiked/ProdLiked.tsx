import { Products } from "../../../App";
import { useAddProduct } from "../../../hooks/addProductToBasket";
import { useLikedProduct } from "../../../hooks/likedProduct";
import basketimg from "../../../assets/basket.png";
import basketfull from "../../../assets/basket-full.png";
import close from "../../../assets/close.png";

interface typeLiked {
  fetchData: () => void;
  datasLiked: Products[];
  setDatasLiked: React.Dispatch<React.SetStateAction<Products[]>>;
}

const ProdLiked = ({ fetchData, datasLiked, setDatasLiked }: typeLiked) => {
  const { likedProduct } = useLikedProduct(fetchData);
  const { addProduct } = useAddProduct(fetchData);

  const handleLiked = (id: number) => {
    likedProduct(id);
    const update = datasLiked.map((element) => {
      return element.id === id
        ? { ...element, Isliked: !element.Isliked }
        : element;
    });
    setDatasLiked(update);
  };
  const handleAddToBasket = (id: number) => {
    addProduct(id);
    const update = datasLiked.map((element) => {
      return element.id === id
        ? { ...element, InBasket: !element.InBasket }
        : element;
    });
    setDatasLiked(update);
  };

  const Products = datasLiked.map((elm: Products) => {
    return elm.Isliked ? (
      <div className="liked-items-elements" key={elm.id}>
        <img src={elm.img} alt="" className="liked-img" />
        <div className="liked-img-conteiner">
          <p>{elm.Name}</p>
          <p>Prize: {elm.Prize} $</p>
          <div className="liked-icons">
            <div className="liked-icons-cont">
              {elm.InBasket ? (
                <img
                  src={basketfull}
                  alt="basket"
                  className="img-basked"
                  onClick={() => handleAddToBasket(elm.id)}
                />
              ) : (
                <img
                  src={basketimg}
                  alt="basket"
                  className="img-basked"
                  onClick={() => handleAddToBasket(elm.id)}
                />
              )}
              <p onClick={() => handleAddToBasket(elm.id)}>Add to Basket</p>
            </div>
            <div className="liked-icons-cont">
              <img
                src={close}
                alt="liked"
                className="img-liked"
                onClick={() => handleLiked(elm.id)}
              />
              <p onClick={() => handleLiked(elm.id)}>Remove Item</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  });
  return <>{Products}</>;
};
export default ProdLiked;
