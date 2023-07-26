import { useCallback } from "react";
import { Products } from "../App";
import supabase from "../supabase";

export function useAddProduct(fetchData: () => void) {
  const addProduct = useCallback(
    async (id: number) => {
      const productToUpdate = await supabase
        .from("Products")
        .select("*")
        .eq("id", id)
        .single();

      if (productToUpdate.error) {
        // Handle error
        console.error("Error fetching product:", productToUpdate.error.message);
        return;
      }
      // Toggle the Isliked status
      const updatedInBasket = !productToUpdate.data.InBasket;

      // Update the database with the new Isliked status
      const { data: updatedProduct, error } = await supabase
        .from("Products")
        .update({ InBasket: updatedInBasket })
        .eq("id", id)
        .single();

      if (error) {
        // Handle error
        console.error("Error updating product:", error.message);
        return;
      }

      // Fetch the updated data after successful update
      fetchData();
    },
    [fetchData]
  );

  return { addProduct };
}
