import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Checking product routes", (): void => {
  it("test index route works", async (): Promise<void> => {
    const response = await request.get("/products");
    expect(response.statusCode).toEqual(200);
  });

  it("test show route works", async (): Promise<void> => {
    const response = await request.get("/products/1");
    expect(response.statusCode).toEqual(200);
  });

  it("test create route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.post("/products");
    expect(response.statusCode).toEqual(401);
  });

  it("test update route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.put("/products/1");
    expect(response.statusCode).toEqual(401);
  });

  it("test delete route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.delete("/products/1");
    expect(response.statusCode).toEqual(401);
  });
});
