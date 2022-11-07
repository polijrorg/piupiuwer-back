import { Piu, PiuLike, User } from '@prisma/client';
import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import ILikePiuDTO from '../dtos/ILikePiuDTO';
import IUpdatePiuDTO from '../dtos/IUpdatePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu & {
    user: User;
    likes: PiuLike[];
  }>;
  findById(id: string): Promise<(Piu & {
    user: User;
    likes: PiuLike[];
  }) | null>;
  list(): Promise<(Piu & {
    user: User;
    likes: PiuLike[];
  })[]>;
  update(data: IUpdatePiuDTO): Promise<(Piu & {
    user: User;
    likes: PiuLike[];
  })>;
  delete(id: string): Promise<void>;
  like(data: ILikePiuDTO): Promise<(Piu & {
    user: User;
    likes: PiuLike[];
  })>;
  unlike(data: ILikePiuDTO): Promise<(Piu & {
    user: User;
    likes: PiuLike[];
  })>;
}

export default IPiusRepository;
