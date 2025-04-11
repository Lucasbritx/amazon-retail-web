export const getOrders = async () => {
  const res = await fetch("/api/orders", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data.orders;
};
