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

const Card = ({ id, img, name, price, onClick }: CardProps) => {
  return (
    <div key={id} className="product">
      <img src={img} alt={name} />
      <p>{name}</p>
      <p>{price}</p>
      <Button onClick={() => onClick(id)} text={BUTTON_TEXT} />
    </div>
  );
};

export default Card;
