import prisma from '@shared/infra/prisma/client';
import { Prisma, Follows } from '@prisma/client';
import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import IFollowsRepository from '@modules/users/repositories/IFollowsRepository';

export default class FollowsRepository implements IFollowsRepository {
  private ormRepository: Prisma.FollowsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.follows;
  }

  public async findById({ followerId, followingId }: IFollowUserDTO): Promise<Follows | null> {
    const follow = await this.ormRepository.findUnique({ where: { followsId: { followerId, followingId } } });

    return follow;
  }
}
