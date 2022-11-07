import {
  User, Favorite, Follows, Piu, PiuLike,
} from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFavoritePiuDTO from '../dtos/IFavoritePiuDTO';
import IFollowUserDTO from '../dtos/IFollowUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })>;
  findByUsername(username: string): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  }) | null>;
  findByEmail(email: string): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  }) | null>;
  findById(id: string): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  }) | null>;
  list(): Promise<User[]>;
  update(data: IUpdateUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })>;
  delete(id: string): Promise<void>;
  follow({ followerId, followingId }: IFollowUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })>;
  unfollow({ followerId, followingId }: IFollowUserDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })>;
  favorite(data: IFavoritePiuDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })>;
  unfavorite(data: IFavoritePiuDTO): Promise<(User & {
    pius: Piu[],
    likes: PiuLike[],
    favorites: Favorite[],
    followedBy: Follows[],
    following: Follows[]
  })>;
}

export default IUsersRepository;
