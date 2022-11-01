import { Favorite } from '@prisma/client';
import IFavoritePiuDTO from '../dtos/IFavoritePiuDTO';

interface IFavoritesRepository {
  findById(data: IFavoritePiuDTO): Promise<Favorite | null>;
}

export default IFavoritesRepository;
