import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Checking user routes", (): void => {
  it("test index route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.get("/users");
    expect(response.statusCode).toEqual(401);
  });

  it("test show route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.get("/users/1");
    expect(response.statusCode).toEqual(401);
  });

  it("test create route works", async (): Promise<void> => {
    const response = await request.post("/users/register");
    expect(response.statusCode).toEqual(200);
  });

  it("test create route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.post("/users");
    expect(response.statusCode).toEqual(401);
  });

  it("test update route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.put("/users/1");
    expect(response.statusCode).toEqual(401);
  });

  it("test authentication route works", async (): Promise<void> => {
    const response = await request.post("/users/authenticate");
    expect(response.statusCode).toEqual(200);
  });

  it("test delete route works (should get jwt authentication error)", async (): Promise<void> => {
    const response = await request.delete("/orders/1");
    expect(response.statusCode).toEqual(401);
  });
});
