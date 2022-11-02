import { inject, injectable } from 'tsyringe';

import { Piu } from '@prisma/client';

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

  public async execute({ piuId, piu: { text, userId } }: IRequest): Promise<Piu> {
    const piu = await this.piusRepository.findById(piuId);

    if (!piu) throw new AppError('Piu not found', 404);

    if (piu.userId !== userId) throw new AppError('You can only update your own pius');

    const updatedPiu = await this.piusRepository.update({
      piuId, text,
    });

    return updatedPiu;
  }
}
