import { inject, injectable } from 'tsyringe';

import { Piu, PiuLike, User } from '@prisma/client';

import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class ListPiusService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute(): Promise<(Piu & {
    user: Omit<User, 'password'>;
    likes: PiuLike[];
  })[]> {
    const piusWithoutUser = (await this.piusRepository.list()).map(({ user: { password: _, ...userWithoutPassword }, ...piuWithoutUser }) => ({ ...piuWithoutUser, user: userWithoutPassword }));

    return piusWithoutUser;
  }
}
