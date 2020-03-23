import Debug from 'debug';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_ROLE, USER_ROLE } from '../../common';
import { basename } from 'path';

const debug = Debug(`app: ${basename(__dirname)} ~ ${basename(__filename)}`);

@Injectable()
export class AuthRolesGuard extends AuthGuard('jwt') {
  readonly roles: (ADMIN_ROLE | USER_ROLE)[];

  constructor(...roles: (ADMIN_ROLE | USER_ROLE)[]) {
    super();
    this.roles = roles;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      debug(info);
      throw err || new UnauthorizedException('Unauthorized');
    }
    if (this.roles.length) {
      const hasRole = () =>
        this.roles.some(role => user.userRoles.includes(role));
      if (!user.userRoles || !hasRole()) {
        throw new ForbiddenException();
      }
    }
    return user;
  }
}
