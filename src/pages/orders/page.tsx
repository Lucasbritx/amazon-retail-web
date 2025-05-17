"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { Product } from "@/types/Product";
import { getOrders } from "../service/getOrders";
import { Order } from "@/types/Order";

const REMOVE_FROM_CART = "Remove from cart";

export default function Orders() {
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  return (
    <div className="relative">
      {orders.length && (
        <div className="flex gap-2 p-4 flex-col">
          {orders?.map((order: Order) => (
            <div>
              <h1 className="text-2xl font-bold">
                Order ID: {order.id}
              </h1>
              <div className="flex gap-2 p-4">
                {order.items.map((product: Product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    onClick={() => {}}
                    buttonText={REMOVE_FROM_CART}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
