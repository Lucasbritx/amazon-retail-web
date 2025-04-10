import { NextApiRequest } from "next";

const ORDERS = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    img: "https://picsum.photos/200/300",
  },
];

export async function GET(req: NextApiRequest) {
  try {
    const id = Number(req.query?.id);
    if (id) {
      const order = ORDERS.find((order) => order.id === id);
      if (order) {
        return new Response(JSON.stringify({ order }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify({ orders: ORDERS }), {
        status: 200,
      });
    }
  } catch (err) {
    console.log("ERROR - ", err);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { name, price, img } = await req.json();
    if (name && price && img) {
      const id = ORDERS.length + 1;
      ORDERS.push({ id, name, price, img });
      return new Response(JSON.stringify({ id }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}
