import prisma from '@shared/infra/prisma/client';
import {
  Favorite, Follows, Piu, PiuLike, Prisma, User,
} from '@prisma/client';

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

  public async create(data: ICreateUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })> {
    const user = await this.ormRepository.create({
      data,
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async findByUsername(username: string): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  }) | null> {
    const user = await this.ormRepository.findUnique({
      where: { username },
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  }) | null> {
    const user = await this.ormRepository.findUnique({
      where: { email },
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async list(): Promise<User[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async findById(id: string): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  }) | null> {
    const user = await this.ormRepository.findUnique({
      where: { id },
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async update({ user: userData, userId }: IUpdateUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: {
        ...userData,
      },
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ where: { id } });
  }

  public async follow({ followerId, followingId }: IFollowUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })> {
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
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async unfollow({ followerId, followingId }: IFollowUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })> {
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
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async favorite({ userId, id }: IFavoritePiuDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: {
        favorites: {
          create: {
            piuId: id,
          },
        },
      },
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }

  public async unfavorite({ userId, id }: IFavoritePiuDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })> {
    const user = await this.ormRepository.update({
      where: { id: userId },
      data: {
        favorites: {
          delete: {
            favoriteId: { userId, piuId: id },
          },
        },
      },
      include: {
        pius: true,
        likes: true,
        favorites: true,
        followedBy: true,
        following: true,
      },
    });

    return user;
  }
}
