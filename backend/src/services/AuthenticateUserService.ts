import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
