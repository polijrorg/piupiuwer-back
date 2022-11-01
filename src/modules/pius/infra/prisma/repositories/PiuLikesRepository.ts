import prisma from '@shared/infra/prisma/client';
import { Prisma, PiuLike } from '@prisma/client';

import IPiuLikesRepository from '@modules/pius/repositories/IPiuLikesRepository';
import ILikePiuDTO from '@modules/pius/dtos/ILikePiuDTO';

export default class PiuLikesRepository implements IPiuLikesRepository {
  private ormRepository: Prisma.PiuLikeDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.piuLike;
  }

  public async findById({ id, userId }: ILikePiuDTO): Promise<PiuLike | null> {
    const piu = await this.ormRepository.findUnique({ where: { likeId: { piuId: id, userId } } });

    return piu;
  }
}
