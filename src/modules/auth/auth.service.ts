import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAccessTokenDto, UserSignInDto } from "./dto";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  private async getSignedToken(userId: number, email: string) {
    const payload = {
      id: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: Number(this.config.get("TOKEN_EXPIRY_TIME")),
      secret: this.config.get("JWT_SECRET"),
    });
  }

  private async verifyPasswords(hashedPassword: string, plainPassword: string) {
    return argon.verify(hashedPassword, plainPassword);
  }

  async signIn(data: UserSignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new NotFoundException("Could not find an User with given email");
    }

    const passwordMatches = await this.verifyPasswords(
      user.password,
      data.password
    );
    if (!passwordMatches) {
      throw new UnauthorizedException("Invalid password");
    }

    return plainToInstance(JwtAccessTokenDto, {
      accessToken: await this.getSignedToken(user.id, user.email),
    });
  }
}
