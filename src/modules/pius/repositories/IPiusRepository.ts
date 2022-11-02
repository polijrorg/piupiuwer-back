import { Piu } from '@prisma/client';
import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import ILikePiuDTO from '../dtos/ILikePiuDTO';
import IUpdatePiuDTO from '../dtos/IUpdatePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  findById(id: string): Promise<Piu | null>;
  list(): Promise<Piu[]>;
  update(data: IUpdatePiuDTO): Promise<Piu>;
  delete(id: string): Promise<void>;
  like(data: ILikePiuDTO): Promise<Piu>;
  unlike(data: ILikePiuDTO): Promise<Piu>;
}

export default IPiusRepository;
