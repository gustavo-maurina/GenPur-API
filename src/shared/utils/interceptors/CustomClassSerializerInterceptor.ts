import { ClassSerializerInterceptor } from "@nestjs/common";

export class CustomClassSerializerInterceptor extends ClassSerializerInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(reflector: any) {
    super(reflector, { excludeExtraneousValues: true });
  }
}
