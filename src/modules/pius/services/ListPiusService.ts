import { inject, injectable } from 'tsyringe';

import { Piu } from '@prisma/client';

import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class ListPiusService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute(): Promise<Piu[]> {
    const pius = await this.piusRepository.list();

    return pius;
  }
}
