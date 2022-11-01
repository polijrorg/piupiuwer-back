import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFollowUserDTO from '../dtos/IFollowUserDTO';

type IRequest = IFollowUserDTO;

@injectable()
export default class FollowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ followerId, followingId } : IRequest): Promise<Omit<User, 'password'>> {
    const followingUser = await this.usersRepository.findById(followingId);

    if (!followingUser) throw new AppError('User to be followed not found', 404);

    const { password: _, ...userWithoutPassword } = await this.usersRepository.follow({ followerId, followingId });

    return userWithoutPassword;
  }
}
