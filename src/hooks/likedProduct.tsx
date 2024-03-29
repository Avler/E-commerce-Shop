import { useCallback } from "react";
import supabase from "../supabase";
import { useDispatch } from "react-redux";

// Hook for the likedProduct function
export function useLikedProduct(fetchData: () => void) {
  const dispatch = useDispatch();
  const likedProduct = useCallback(async (id: number) => {
    // Fetch the product by ID
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
    const updatedIsLiked = !productToUpdate.data.Isliked;

    // Update the database with the new Isliked status
    const { data: updatedProduct, error } = await supabase
      .from("Products")
      .update({ Isliked: updatedIsLiked })
      .eq("id", id)
      .single();

    if (error) {
      // Handle error
      console.error("Error updating product:", error.message);
      return;
    }
  }, []);

  return { likedProduct };
}
