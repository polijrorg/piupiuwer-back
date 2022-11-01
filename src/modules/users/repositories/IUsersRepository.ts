import { User } from '@prisma/client';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFavoritePiuDTO from '../dtos/IFavoritePiuDTO';
import IFollowUserDTO from '../dtos/IFollowUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
  follow({ followerId, followingId }: IFollowUserDTO): Promise<User>;
  unfollow({ followerId, followingId }: IFollowUserDTO): Promise<User>;
  favorite(data: IFavoritePiuDTO): Promise<User>;
  unfavorite(data: IFavoritePiuDTO): Promise<User>;
}

export default IUsersRepository;
