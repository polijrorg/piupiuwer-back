import { Follows } from '@prisma/client';
import IFollowUserDTO from '../dtos/IFollowUserDTO';

interface IFollowsRepository {
  findById(data: IFollowUserDTO): Promise<Follows | null>;
}

export default IFollowsRepository;
