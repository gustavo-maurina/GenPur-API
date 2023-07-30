import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserSignInDto } from "./dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("/sign-in")
  signIn(@Body() body: UserSignInDto) {
    console.log("in");
    return this.authService.signIn(body);
  }
}
