import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const checkUserExist = await userRepository.findOne({
      where: { email },
    });
    if (checkUserExist) {
      throw new Error(' Email already used');
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
