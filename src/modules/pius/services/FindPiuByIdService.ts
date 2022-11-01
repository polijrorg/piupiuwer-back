import { inject, injectable } from 'tsyringe';

import { Piu } from '@prisma/client';

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

  public async execute({ id } : IRequest): Promise<Piu> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) throw new AppError('Piu not found', 404);

    return piu;
  }
}
