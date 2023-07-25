import { useState, useCallback } from "react";
import { Products } from "../App";
import supabase from "../supabase";

export function useAddProduct(fetchData: () => void) {
  const [data, setData] = useState<Products[]>([]);

  const addProduct = useCallback(
    async (id: number) => {
      let products = data.slice();
      let inbasket = products.find((elm: Products) => elm.id === id)?.InBasket;
      await supabase
        .from("Products")
        .update({ InBasket: !inbasket })
        .eq("id", id);
      fetchData();
    },
    [data, fetchData]
  );

  return { addProduct, setData };
}
