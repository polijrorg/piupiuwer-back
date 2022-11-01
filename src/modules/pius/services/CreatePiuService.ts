import { inject, injectable } from 'tsyringe';

import { Piu } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import IPiusRepository from '../repositories/IPiusRepository';

type IRequest = ICreatePiuDTO;

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute({
    text,
    userId,
  }: IRequest): Promise<Piu> {
    const piu = await this.piusRepository.create({
      text,
      userId,
    });

    return piu;
  }
}
