import { inject, injectable } from 'tsyringe';

import { Piu, PiuLike, User } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  piuId: string;
  piu: {
    text: string;
    userId: string;
  }
}

@injectable()
export default class UpdatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute({ piuId, piu: { text, userId } }: IRequest): Promise<(Piu & {
    user: Omit<User, 'password'>;
    likes: PiuLike[];
  })> {
    const piu = await this.piusRepository.findById(piuId);

    if (!piu) throw new AppError('Piu not found', 404);

    if (piu.userId !== userId) throw new AppError('You can only update your own pius');

    const updatedPiu = await this.piusRepository.update({
      piuId, text,
    });

    const { user: { password: _, ...userWithoutPassword }, ...piuWithoutUser } = updatedPiu;

    return { ...piuWithoutUser, user: userWithoutPassword };
  }
}
