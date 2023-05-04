import "./addnewitem.scss";

import { useFormik } from "formik";
import supabase from "../../supabase";

const AddNewItem = ({ fetchData }: any) => {
  

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

    const formik = useFormik({
        initialValues: {
        forwho: "",
        product_category: "",
        item_category: "",
        product_name: "",
        product_price: "",
        product_img: null,
        },
        onSubmit: async (values:any, actions:any) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const img = URL.createObjectURL(values.product_img);
        const imgBase64 = await getBase64ImageFromUrl(img);

        await supabase.from("Products").insert({
            For: values.forwho,
            Category: values.product_category,
            Item: values.item_category,
            Name: values.product_name,
            Prize: values.product_price,
            img: imgBase64,
        });

        fetchData();
        actions.resetForm();
        },
    });

    return (
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
                id={1}
                onChange={(event) => {
                formik.setFieldValue(
                    "product_img",
                    event.currentTarget.files && event.currentTarget.files[0]
                );
                }}
            />
        </div>
        <button type="submit" className="sub-btn">Add Item</button>
    </form>
        )
}
        export default AddNewItem