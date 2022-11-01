import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFollowUserDTO from '../dtos/IFollowUserDTO';
import IFollowsRepository from '../repositories/IFollowsRepository';

type IRequest = IFollowUserDTO;

@injectable()
export default class FollowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,
  ) { }

  public async execute({ followerId, followingId } : IRequest): Promise<Omit<User, 'password'>> {
    const followingUser = await this.usersRepository.findById(followingId);

    if (!followingUser) throw new AppError('User to be followed not found', 404);

    const isFollowing = await this.followsRepository.findById({ followerId, followingId });

    if (isFollowing) throw new AppError('You are already following this user');

    const { password: _, ...userWithoutPassword } = await this.usersRepository.follow({ followerId, followingId });

    return userWithoutPassword;
  }
}
