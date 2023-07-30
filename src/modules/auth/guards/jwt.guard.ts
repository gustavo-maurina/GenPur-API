import { Guard } from "@enums";
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard(Guard.JWT) {
  constructor() {
    super();
  }
}
