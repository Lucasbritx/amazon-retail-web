const PRODUCTS = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    img: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    img: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    img: "https://via.placeholder.com/150",
  },
];

export async function GET(req: Request) {
  try {
    const { id } = await req.json();
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
