import prisma from '@shared/infra/prisma/client';
import { Prisma, Favorite } from '@prisma/client';

import IFavoritesRepository from '@modules/users/repositories/IFavoritesRepository';
import IFavoritePiuDTO from '@modules/users/dtos/IFavoritePiuDTO';

export default class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Prisma.FavoriteDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.favorite;
  }

  public async findById({ id, userId }: IFavoritePiuDTO): Promise<Favorite | null> {
    const user = await this.ormRepository.findUnique({ where: { favoriteId: { piuId: id, userId } } });

    return user;
  }
}
