import React from "react";

interface CardProps {
    id: number;
    img: string;
    name: string;
    price: number;
    onClick: (id: number) => void;
}

const BUTTON_TEXT = "Get Product";

const Card = ({id, img, name, price, onClick}: CardProps) => {
  return (
    <div key={id} className="product">
      <img src={img} alt={name} />
      <p>{name}</p>
      <p>{price}</p>
      <button className="" onClick={() => onClick(id)}>{BUTTON_TEXT}</button>
    </div>
  );
};

export default Card;
