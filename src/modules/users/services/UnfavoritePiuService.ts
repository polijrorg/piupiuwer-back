import { inject, injectable } from 'tsyringe';

import { User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFavoritePiuDTO from '../dtos/IFavoritePiuDTO';
import IFavoritesRepository from '../repositories/IFavoritesRepository';

type IRequest = IFavoritePiuDTO;

@injectable()
export default class UnfavoritePiuService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) { }

  public async execute({ id, userId } : IRequest): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found', 404);

    const favorite = await this.favoritesRepository.findById({ userId, id });

    if (!favorite) throw new AppError('This piu is already unfavorited');

    const { password: _, ...userWithoutPassword } = await this.usersRepository.unfavorite({ id, userId });

    return userWithoutPassword;
  }
}
