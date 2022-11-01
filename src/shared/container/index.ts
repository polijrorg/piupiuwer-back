import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

// Pius
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import PiusRepository from '@modules/pius/infra/prisma/repositories/PiusRepository';

// PiuLikes
import IPiuLikesRepository from '@modules/pius/repositories/IPiuLikesRepository';
import PiuLikesRepository from '@modules/pius/infra/prisma/repositories/PiuLikesRepository';

// Favorites
import FavoritesRepository from '@modules/users/infra/prisma/repositories/FavoritesRepository';
import IFavoritesRepository from '@modules/users/repositories/IFavoritesRepository';

// Follows
import IFollowsRepository from '@modules/users/repositories/IFollowsRepository';
import FollowsRepository from '@modules/users/infra/prisma/repositories/FollowsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IPiusRepository>('PiusRepository', PiusRepository);
container.registerSingleton<IPiuLikesRepository>('PiuLikesRepository', PiuLikesRepository);
container.registerSingleton<IFavoritesRepository>('FavoritesRepository', FavoritesRepository);
container.registerSingleton<IFollowsRepository>('FollowsRepository', FollowsRepository);
