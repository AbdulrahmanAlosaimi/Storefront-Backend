import { Order, OrderStore } from "../../models/order";

const store = new OrderStore();

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have an update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have an delete method", () => {
    expect(store.delete).toBeDefined();
  });

  let orderId: number;
  it("create method should add an order", async () => {
    // This object is casted as any so the id property can be reached
    const result: any = await store.create({
      productId: 1,
      orderId: Math.floor(Math.random() * 20),
      quantity: 1,
      userId: 1,
      status: "complete",
    });
    expect(result).toEqual(
      jasmine.objectContaining({
        status: "complete",
      })
    );
    orderId = result.id;
    expect(result.id).toEqual(jasmine.any(Number));
  });

  it("show method should return correct order", async () => {
    const result: any = await store.show(orderId);
    expect(result).toEqual(
      jasmine.objectContaining({
        status: "complete",
      })
    );
    expect(result.id).toEqual(jasmine.any(Number));
  });
});
