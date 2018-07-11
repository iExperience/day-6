import {repository, Filter, FilterBuilder} from '@loopback/repository';
import {HttpErrors, post, requestBody, param, get} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../models/user';

import {sign, verify} from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';

export class LoginController {
  constructor(@repository(UserRepository) protected userRepo: UserRepository) {}

  @get('/verify')
  verifyToken(@param.query.string('jwt') jwt: string) {
    try {
      let payload = verify(jwt, 'shh') as any;
      //payload.user.id;
      return payload;
    } catch (err) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    // The user is authenticated and we can process...
  }

  @post('/registration')
  async registerUser(@requestBody() user: User) {
    let userToCreate = new User();
    userToCreate.firstname = user.firstname;
    userToCreate.lastname = 'Some last name';
    userToCreate.email = user.email;
    //userToCreate.password = user.password;

    userToCreate.password = await bcrypt.hash(user.password, 10);

    let createdUser = await this.userRepo.create(userToCreate);

    let jwt = sign(
      {
        user: {
          id: createdUser.id,
          email: createdUser.email
        },
      },
      'shh',
      {
        issuer: 'auth.ix.com',
        audience: 'ix.com',
      },
    );

    return {
      token: jwt,
    };
  }

  @post('/login')
  async loginUser(@requestBody() user: User) {
    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      email: user.email,
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let foundUser = (await this.userRepo.findOne({
      where: {
        email: user.email,
      },
    })) as User;

    if (!await bcrypt.compare(user.password, foundUser.password)) {
      throw new HttpErrors.Unauthorized("Sorry...");
    }

    let jwt = sign(
      {
        user: {
          id: foundUser.id,
          email: foundUser.email
        },
      },
      'shh',
      {
        issuer: 'auth.ix.com',
        audience: 'ix.com',
      },
    );

    return {
      token: jwt,
    };
  }
}
