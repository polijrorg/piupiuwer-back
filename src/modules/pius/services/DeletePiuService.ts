import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export default class DeletePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute({
    id, userId,
  }: IRequest): Promise<void> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) throw new AppError('Piu not found', 404);

    if (piu.userId !== userId) throw new AppError('You can only delete pius you have posted');

    await this.piusRepository.delete(id);
  }
}
