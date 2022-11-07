import { inject, injectable } from 'tsyringe';

import { Piu, PiuLike, User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';
import ILikePiuDTO from '../dtos/ILikePiuDTO';
import IPiuLikesRepository from '../repositories/IPiuLikesRepository';

type IRequest = ILikePiuDTO;

@injectable()
export default class ToggleLikePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('PiuLikesRepository')
    private piuLikesRepository: IPiuLikesRepository,
  ) { }

  public async execute({
    id, userId,
  }: IRequest): Promise<{piu: (Piu & {
    user: Omit<User, 'password'>;
    likes: PiuLike[];
  }), operation: 'like' | 'unlike'}> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) throw new AppError('Piu not found', 404);

    const piuLike = await this.piuLikesRepository.findById({ id, userId });

    const operation = piuLike ? 'unlike' : 'like';

    const piuAfterOperation = await this.piusRepository[operation]({ id, userId });

    const { user: { password: _, ...userWithoutPassword }, ...piuWithoutUser } = piuAfterOperation;

    return { piu: { ...piuWithoutUser, user: userWithoutPassword }, operation };
  }
}
