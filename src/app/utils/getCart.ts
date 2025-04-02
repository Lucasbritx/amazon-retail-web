export const getCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart;
  };