import { PiuLike } from '@prisma/client';
import ILikePiuDTO from '../dtos/ILikePiuDTO';

interface IPiuLikesRepository {
  findById(data: ILikePiuDTO): Promise<PiuLike | null>;
}

export default IPiuLikesRepository;
