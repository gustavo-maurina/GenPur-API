import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Route handler parameter decorator. Extracts the `user`
 * property from the `req` object and populates the decorated
 * parameter with the database information for that user.
 *
 * For example, extracting all params:
 * ```typescript
 * findOne(@ReqUser() user: UserDto)
 * ```
 * `user` will have information for the given user, in case auth passes.
 */
export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
