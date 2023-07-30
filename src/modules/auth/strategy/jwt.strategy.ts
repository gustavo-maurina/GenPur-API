import { Guard } from "@enums";
import { PrismaService } from "@modules/prisma/prisma.service";
import { UserDto } from "@modules/users/dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Jwt } from "@types";
import { plainToInstance } from "class-transformer";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Guard.JWT) {
  constructor(config: ConfigService, private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: Jwt) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new UnauthorizedException("User was not found");
    }

    return plainToInstance(UserDto, user);
  }
}
