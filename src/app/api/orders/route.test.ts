import { GET, POST } from "./route";

describe("Orders API", () => {
  describe("GET", () => {
    it("should return all orders when no ID is provided", async () => {
      const req = new Request("http://localhost/api/orders"); // sem query param
      const res = await GET(req);

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.orders).toHaveLength(1);
    });

    it("should return a specific order when a valid ID is provided", async () => {
      const req = new Request("http://localhost/api/orders?id=1"); // com query param
      const res = await GET(req);

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.order).toBeDefined();
      expect(data.order.id).toBe(1);
    });

    it("should return 404 when an order with the given ID does not exist", async () => {
      const req = new Request("http://localhost/api/orders?id=999");
      const res = await GET(req);

      expect(res.status).toBe(404);
      const data = await res.json();
      expect(data.error).toBe("Order not found");
    });
  });

  describe("POST", () => {
    it("should create a new order when a valid body is provided", async () => {
      const body = JSON.stringify([
        {
          name: "New Product",
          price: 200,
          img: "https://picsum.photos/200/300",
        },
      ]);

      const req = new Request("http://localhost/api/orders", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await POST(req);

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.id).toBe(2);
    });

    it("should return 400 when the body is invalid or empty", async () => {
      const req = new Request("http://localhost/api/orders", {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await POST(req);

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe("Invalid request");
    });
  });
});