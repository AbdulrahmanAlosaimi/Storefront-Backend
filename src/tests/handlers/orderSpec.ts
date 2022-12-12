import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Checking order routes", (): void => {
  it("test index route works", async (): Promise<void> => {
    const response = await request.get("/orders");
    expect(response.statusCode).toEqual(200);
  });

  it("test show route works", async (): Promise<void> => {
    const response = await request.get("/orders/1");
    expect(response.statusCode).toEqual(200);
  });

  it("test show user orders route works", async (): Promise<void> => {
    const response = await request.get("/orders/1");
    expect(response.statusCode).toEqual(200);
  });

  it("test create route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.post("/orders");
    expect(response.statusCode).toEqual(401);
  });

  it("test update route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.put("/orders/1");
    expect(response.statusCode).toEqual(401);
  });

  it("test delete route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.delete("/orders/1");
    expect(response.statusCode).toEqual(401);
  });
});
