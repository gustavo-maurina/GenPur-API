import { INestApplication } from "@nestjs/common";
import { setupTests } from "./setupTests";
import request from "supertest";
import { UserCreateDto } from "@modules/users/dto";
import type { Test, SuperTest } from "supertest";

describe("Users (e2e)", () => {
  let app: INestApplication;
  let req: SuperTest<Test>;

  const mockUser: UserCreateDto = {
    email: "mockUser@gmail.com",
    firstName: "Mock",
    lastName: "User",
    password: "test123",
  };

  beforeAll(async () => {
    app = await setupTests();
    req = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /", () => {
    it("should fail with status 401 without token", async () => {
      await req.get("/users").expect(401);
    });
  });

  describe("POST /", () => {
    it("should fail without body", async () => {
      await req.post("/users").send().expect(400);
    });

    it("should fail without email", async () => {
      const invalidUser = {
        ...mockUser,
        email: null,
      };

      await req.post("/users").send(invalidUser).expect(400);
    });

    it("should fail with invalid email", async () => {
      const invalidEmails = ["invalid_email.com", "invalid@email", "invalid"];
      for (const email of invalidEmails) {
        await req
          .post("/users")
          .send({ ...mockUser, email })
          .expect(400);
      }
    });

    it("should fail without password", async () => {
      const invalidUser = {
        ...mockUser,
        password: null,
      };

      await req.post("/users").send(invalidUser).expect(400);
    });

    it("create user with valid data", async () => {
      const response = await req.post("/users").send(mockUser).expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.email).toBe(mockUser.email);
      expect(response.body.firstName).toBe(mockUser.firstName);
      expect(response.body.lastName).toBe(mockUser.lastName);
    });
  });
});
