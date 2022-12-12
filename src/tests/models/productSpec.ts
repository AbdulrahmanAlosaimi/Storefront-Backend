import { Product, ProductStore } from "../../models/product";

const store = new ProductStore();

describe("Product Model", () => {
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

  let productId: number;
  it("create method should add an product", async () => {
    // This object is casted as any so the id property can be reached
    const result: any = await store.create({
      name: "Grand Theft Auto 5",
      price: 60,
      category: "Video Games",
    });
    expect(result).toEqual(
      jasmine.objectContaining({
        name: "Grand Theft Auto 5",
        price: 60,
        category: "Video Games",
      })
    );
    productId = result.id;
    expect(result.id).toEqual(jasmine.any(Number));
  });

  it("show method should return correct product", async () => {
    const result: any = await store.show(productId);
    expect(result).toEqual(
      jasmine.objectContaining({
        name: "Grand Theft Auto 5",
        price: 60,
        category: "Video Games",
      })
    );
    expect(result.id).toEqual(jasmine.any(Number));
  });
});
