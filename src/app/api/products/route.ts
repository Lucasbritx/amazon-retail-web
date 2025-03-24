import { NextApiRequest } from "next";
const RANDOM_IMG_URL = "https://picsum.photos/200/300";

const PRODUCTS = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    img: RANDOM_IMG_URL,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    img: RANDOM_IMG_URL,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    img: RANDOM_IMG_URL,
  },
];

export async function GET(req: NextApiRequest) {
  try {
    const id = req.query?.id;
    if (id) {
      const product = PRODUCTS.find((product) => product.id === id);
      if (product) {
        return new Response(JSON.stringify({ product }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    } else {
      return new Response(JSON.stringify({ products: PRODUCTS }), {
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
      const id = PRODUCTS.length + 1;
      PRODUCTS.push({ id, name, price, img });
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
