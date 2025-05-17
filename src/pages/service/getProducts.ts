export const getProducts = async () => {
  const res = await fetch("/api/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data.products;
};
