import "./edititem.scss"
import { useFormik } from "formik";
import supabase from "../../supabase";

const EditItem = ({data , fetchData , setDataEdit}:any)=> {

    async function getBase64ImageFromUrl(imageUrl: any) {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              resolve(reader.result);
            },
            false
          );
          reader.readAsDataURL(blob);
        });
      }
      
      const fileSelectedHandler = async (e:any) => {
        let img = URL.createObjectURL(e.target.files[0])
        const imgBase64 = await getBase64ImageFromUrl(img)
        setDataEdit((prevEditProducts:any) => ([{
            ...prevEditProducts,
            product_img: imgBase64
        }]));
    };
    
    if (!Array.isArray(data)) {
        return <div>No data available.</div>;
      }
    const editPanel = data.map(elm => {

            const formik = useFormik({
                initialValues: {
                forwho: elm.forwho,
                product_category: elm.product_category,
                item_category: elm.item_category,
                product_name: elm.product_name,
                product_price: elm.product_price,
                id: elm.id,
                img: elm.img
                },
                onSubmit: async (values:any, actions:any) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const updates = {
                    For: values.forwho,
                    Category:values.product_category,
                    Item: values.item_category,
                    Name: values.product_name,
                    Prize: values.product_price,
                    img: values.img
                  };
                  await supabase.from("Products").update(updates).eq("id", values.id);
                  fetchData()
                },
            });
           
        return(
            <section className="edit-panel-conteiner" key={elm.id}>
                <img src={elm.img} alt="picture of edit "  className="img-edit"/>
                <form className="add-item" onSubmit={formik.handleSubmit}>
                    <div className="add-item-element">
                        <h2 className="add-item-title">For</h2>
                        <select
                            className="select-list"
                            name="forwho"
                            onChange={formik.handleChange}
                            value={formik.values.forwho}
                        >
                            <option disabled className="select-option"></option>
                            <option value="Man" className="select-option"> Man</option>
                            <option value="Woman" className="select-option">Woman</option>
                            <option value="Kids" className="select-option">Kids</option>
                        </select>
                    </div>
                    <div className="add-item-element">
                        <h2 className="add-item-title">Product Category</h2>
                        <input
                            type="text"
                            className="form-input"
                            name="product_category"
                            onChange={formik.handleChange}
                            value={formik.values.product_category}
                        />
                    </div>
                    <div className="add-item-element">
                        <h2 className="add-item-title">Category</h2>
                        <input
                            type="text"
                            className="form-input"
                            name="item_category"
                            onChange={formik.handleChange}
                            value={formik.values.item_category}
                        />
                    </div>
                    <div className="add-item-element">
                        <h2 className="add-item-title">Name of Product</h2>
                        <input
                            type="text"
                            className="form-input"
                            name="product_name"
                            onChange={formik.handleChange}
                            value={formik.values.product_name}
                        />
                    </div>
                    <div className="add-item-element">
                        <h2 className="add-item-title">Price
                        </h2>
                        <input
                            type="text"
                            className="form-input"
                            name="product_price"
                            onChange={formik.handleChange}
                            value={formik.values.product_price}
                        />
                    </div>
                    <div className="add-item-element">
                        <h2 className="add-item-title">Picture of Product</h2>
                        <input
                            type="file"
                            className="form-input"
                            name="product_img"
                            id={"1"}
                            onChange={fileSelectedHandler}
                        />
                    </div>
                    <button type="submit" className="sub-btn">Edit Item</button>
                </form>
            </section>
        )
    })
    return (
        <>
          {  editPanel }
        </>
    )
}

export default EditItem