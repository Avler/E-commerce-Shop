import { useState, useCallback } from "react";
import { Products } from "../App";
import supabase from "../supabase";

// Hook dla funkcji likedProduct
export function useLikedProduct(fetchData: () => void) {
  const [data, setData] = useState<Products[]>([]);

  const likedProduct = useCallback(
    async (id: number) => {
      let products = data.slice(); // Kopiujemy stan do lokalnej zmiennej
      let liked = products.find((elm: Products) => elm.id === id)?.Isliked;
      await supabase.from("Products").update({ Isliked: !liked }).eq("id", id);
      fetchData();
    },
    [data]
  );

  return { likedProduct, setData };
}
