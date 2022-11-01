import prisma from '@shared/infra/prisma/client';
import { Prisma, Piu } from '@prisma/client';

import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import ILikePiuDTO from '@modules/pius/dtos/ILikePiuDTO';

export default class PiusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.piu;
  }

  public async create(data: ICreatePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.create({
      data,
    });

    return piu;
  }

  public async list(): Promise<Piu[]> {
    const pius = await this.ormRepository.findMany();

    return pius;
  }

  public async findById(id: string): Promise<Piu | null> {
    const piu = await this.ormRepository.findUnique({ where: { id }, include: { favorites: true, likes: true } });

    return piu;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ where: { id } });
  }

  public async like({ id, userId }: ILikePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.update({
      where: { id },
      data: {
        likes: {
          create: {
            userId,
          },
        },
      },
      include: {
        likes: true,
      },
    });

    return piu;
  }

  public async unlike({ id, userId }: ILikePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.update({
      where: { id },
      data: {
        likes: {
          delete: {
            likeId: { piuId: id, userId },
          },
        },
      },
      include: {
        likes: true,
      },
    });

    return piu;
  }
}
