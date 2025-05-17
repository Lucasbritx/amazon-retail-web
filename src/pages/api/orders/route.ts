import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const ORDERS = [
  {
    id: 1,
    items: [
      {
        name: "Product 1",
        price: 100,
        img: "https://picsum.photos/200/300",
      },
      {
        name: "Kindle",
        price: 300,
        img: "https://picsum.photos/200/300",
      },
    ],
  },
];

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));
    if (id) {
      const order = ORDERS.find((order) => order.id === id);
      if (order) {
        return new Response(JSON.stringify({ order }), { status: 200 });
      }
      return new NextResponse(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    } else {
      return new NextResponse(JSON.stringify({ orders: ORDERS }), {
        status: 200,
      });
    }
  } catch (err) {
    console.log("ERROR - ", err);
    return new NextResponse(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.length) {
      const id = ORDERS.length + 1;
      ORDERS.push({ id, items: body });
      return new NextResponse(JSON.stringify({ id }), { status: 201 });
    } else {
      return new NextResponse(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
      });
    }
  } catch (err) {
    console.log("ERROR - ", err);
    return new NextResponse(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}
