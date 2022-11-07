import { inject, injectable } from 'tsyringe';

import { Piu, PiuLike, User } from '@prisma/client';

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
  }: IRequest): Promise<(Piu & {
    user: Omit<User, 'password'>;
    likes: PiuLike[];
  })> {
    const { user: { password: _, ...userWithoutPassword }, ...piuWithoutUser } = await this.piusRepository.create({
      text,
      userId,
    });

    return { ...piuWithoutUser, user: userWithoutPassword };
  }
}
