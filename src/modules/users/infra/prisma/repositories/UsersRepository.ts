import prisma from '@shared/infra/prisma/client';
import { Prisma, User } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFollowUserDTO from '@modules/users/dtos/IFollowUserDTO';
import IFavoritePiuDTO from '@modules/users/dtos/IFavoritePiuDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.ormRepository.findUnique({ where: { username } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findUnique({ where: { email } });

    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findUnique({ where: { id } });

    return user;
  }

  public async update({ user: userData, userId }: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: {
        ...userData,
      },
    });

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ where: { id } });
  }

  public async follow({ followerId, followingId }: IFollowUserDTO): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: followerId },
      data: {
        following: {
          create: {
            followingId,
          },
        },
      },
      include: {
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async unfollow({ followerId, followingId }: IFollowUserDTO): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: followerId },
      data: {
        following: {
          delete: {
            followsId: { followerId, followingId },
          },
        },
      },
      include: {
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async favorite({ userId, id }: IFavoritePiuDTO): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: {
        favorites: {
          create: {
            piuId: id,
          },
        },
      },
    });

    return user;
  }

  public async unfavorite({ userId, id }: IFavoritePiuDTO): Promise<User> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: {
        favorites: {
          delete: {
            favoriteId: { userId, piuId: id },
          },
        },
      },
    });

    return user;
  }
}
