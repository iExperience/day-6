import { repository } from '@loopback/repository';
import {
  HttpErrors,
  post,
  requestBody,
  param,
  get,
} from '@loopback/rest';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';

import { sign, verify } from 'jsonwebtoken';

export class LoginController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) {}

  @get("/verify")
  verifyToken(@param.query.string("jwt") jwt: string) {

    try {
        let payload = verify(jwt, "shh");
        return payload;
    } catch (err) {
        throw new HttpErrors.Unauthorized("Invalid token");
    }

    // The user is authenticated and we can process...

  }

  @post('/login')
  async loginUser(@requestBody() user: User) {
    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let foundUser = await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    }) as User;

    let jwt = sign({
        user: {
            id: foundUser.id,
            email: foundUser.email
        }
    }, 
    "shh", 
    {
        issuer: "auth.ix.com",
        audience: "ix.com"
    });

    return {
        token: jwt
    };
  }
}