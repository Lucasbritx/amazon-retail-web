"use client";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { useCart } from "@/context/CartContext";
import { getProducts } from "./service/getProducts";
import { Input, Modal, Button } from "rollup-ds-poc";
import "rollup-ds-poc/styles";

export default function Home() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <div className="">
      <Button
        title="Open Modal"
        className="bg-white hover:bg-gray-200 hover:opacity-100"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Input placeholder="Input from rollup DS"/>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Welcome to the Product Page</h2>
          <p className="mt-2">Here you can find a variety of products to add to your cart.</p>
        </div>
      </Modal>
      {products.length && (
        <div className="flex gap-2 p-4 flex-wrap">
          {products?.map((product: any) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.img}
              name={product.name}
              price={product.price}
              onClick={addToCart}
              buttonText="Add to cart"
            />
          ))}
        </div>
      )}
      <Button
        title="Add New Product"
        className="fixed bottom-0 right-0 m-4 bg-white hover:bg-gray-200 hover:opacity-100"
        onClick={() => {
          window.location.href = "/newProduct";
        }}
      >
        Add New Product
      </Button>
    </div>
  );
}
