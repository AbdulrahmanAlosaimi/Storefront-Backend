import { User, UserStore } from "../../models/user";

const store = new UserStore();

describe("User Model", () => {
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

  let userId: number;
  it("create method should add an user", async () => {
    // This object is casted as any so the id property can be reached
    const result: any = await store.create({
      firstName: "test",
      lastName: "admin",
      password_digest:
        "$2a$10$evKubSPYWIYFfl4fRmyyzuSbMQKaNLFIE1zw0cQPrTt2/Yj0ZDLsi",
    });
    expect(result).toEqual(
      jasmine.objectContaining({
        first_name: "test",
        last_name: "admin",
      })
    );
    userId = result.id;
    expect(result.id).toEqual(jasmine.any(Number));
    expect(result.password_digest).toEqual(jasmine.any(String));
  });

  it("show method should return correct user", async () => {
    const result: any = await store.show(userId);
    expect(result).toEqual(
      jasmine.objectContaining({
        first_name: "test",
        last_name: "admin",
      })
    );
    expect(result.id).toEqual(jasmine.any(Number));
    expect(result.password_digest).toEqual(jasmine.any(String));
  });
});
