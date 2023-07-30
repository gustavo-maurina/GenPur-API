import { INestApplication } from "@nestjs/common";
import { setupTests } from "./setupTests";
import request from "supertest";
import type { Test, SuperTest } from "supertest";
import { UserCreateDto, UserDto } from "@modules/users/dto";
import { UserSignInDto } from "@modules/auth/dto";
import { JwtService } from "@nestjs/jwt";
import { Jwt } from "@types";
import { ConfigService } from "@nestjs/config";

describe("Auth (e2e)", () => {
  let app: INestApplication;
  let req: SuperTest<Test>;
  let jwtService: JwtService;
  let configService: ConfigService;

  async function createMockUser(data: UserCreateDto) {
    const res = await req.post("/users").send(data).expect(201);

    expect(res.body).toBeDefined();
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBeDefined();
    expect(res.body.firstName).toBeDefined();
    expect(res.body.lastName).toBeDefined();

    return res.body as UserDto;
  }

  beforeAll(async () => {
    app = await setupTests();
    req = request(app.getHttpServer());
    jwtService = app.get(JwtService);
    configService = app.get(ConfigService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe("POST /sign-in", () => {
    it("should have status 400 without body", async () => {
      await req.post("/auth/sign-in").send().expect(400);
    });

    it("should have status 401 with wrong password", async () => {
      const mockData = {
        email: "mock_auth@gmail.com",
        firstName: "mock first name",
        password: "test123",
      };
      const newUser = await createMockUser(mockData);
      expect(newUser).toBeDefined();

      await req
        .post("/auth/sign-in")
        .send({ email: newUser.email, password: "wrong" })
        .expect(401);
    });

    it("should have status 404 with wrong email", async () => {
      await req
        .post("/auth/sign-in")
        .send({ email: "non-existing@email.com", password: "any" })
        .expect(404);
    });

    it("should return correct accessToken, and the token should work on protected endpoints", async () => {
      const mockUser: UserCreateDto = {
        email: "mock_user_for_auth@gmail.com",
        firstName: "Mock User",
        password: "test123",
      };

      const newUser = await createMockUser(mockUser);
      expect(newUser).toBeDefined();

      const body: UserSignInDto = {
        email: newUser.email,
        password: mockUser.password,
      };

      const res = await req.post("/auth/sign-in").send(body).expect(200);

      expect(res.body).toBeDefined();
      expect(res.body.accessToken).toBeDefined();
      expect(typeof res.body.accessToken).toBe("string");

      const token = res.body.accessToken;
      const decodedToken = jwtService.decode(token) as Jwt;

      expect(decodedToken.id).toBeDefined();
      expect(decodedToken.email).toBeDefined();
      expect(decodedToken.exp).toBeDefined();
      expect(decodedToken.iat).toBeDefined();

      expect(decodedToken.id).toBe(newUser.id);
      expect(decodedToken.email).toBe(newUser.email);

      expect(typeof decodedToken.exp).toBe("number");
      expect(typeof decodedToken.iat).toBe("number");

      expect(decodedToken.exp).toBeGreaterThan(decodedToken.iat);
      expect(decodedToken.exp).toBe(
        decodedToken.iat + Number(configService.get("TOKEN_EXPIRY_TIME"))
      );

      await req.get("/users").auth(token, { type: "bearer" }).expect(200);
    });
  });
});
