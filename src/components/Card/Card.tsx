import React from "react";
import Button from "../Button";

interface CardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  onClick: (id: number) => void;
}

const BUTTON_TEXT = "Get Product";
const ADD_TO_CART_TEXT = "Add to Cart";

const Card = ({ id, img, name, price, onClick }: CardProps) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const product = { id, img, name, price };
    const isProductInCart = cart.some((item: any) => item.id === id);
    if (!isProductInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    alert("Product added to cart");
  };

  return (
    <div key={id} className="product border rounded-md shadow-md">
      <img src={img} alt={name} className="w-full" />
      <div className="p-2">
        <p>{name}</p>
        <p id="price" role="price">
          R$ {price}
        </p>
        <div className="flex gap-2">
          <Button onClick={() => onClick(id)} text={BUTTON_TEXT} />
          <Button onClick={addToCart} text={ADD_TO_CART_TEXT} />
        </div>
      </div>
    </div>
  );
};

export default Card;
