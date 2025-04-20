import React from "react";
import Button from "../Button";
import { Product } from "@/types/Product";

interface CardProps {
  id: number;
  img: string;
  name: string;
  price: number;
  onClick: (product: Product) => void;
  buttonText: string;
}

const Card = ({ id, img, name, price, onClick, buttonText }: CardProps) => {

  const product = {
    id,
    name,
    price,
    img,
  };

  return (
    <div key={id} className="product border rounded-md shadow-md w-[calc(25%-8px)]">
      <img src={img} alt={name} className="w-full" />
      <div className="p-2">
        <p>{name}</p>
        <p id="price" role="price">
          R$ {price}
        </p>
        <div className="flex gap-2 justify-center mt-1">
          <Button onClick={() => onClick(product)} children={buttonText} />
        </div>
      </div>
    </div>
  );
};

export default Card;
