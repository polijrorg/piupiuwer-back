import { inject, injectable } from 'tsyringe';

import { Piu, PiuLike, User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class FindPiuByIdService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute({ id } : IRequest): Promise<(Piu & {
    user: Omit<User, 'password'>;
    likes: PiuLike[];
  })> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) throw new AppError('Piu not found', 404);

    const { user: { password: _, ...userWithoutPassword }, ...piuWithoutUser } = piu;

    return { ...piuWithoutUser, user: userWithoutPassword };
  }
}
