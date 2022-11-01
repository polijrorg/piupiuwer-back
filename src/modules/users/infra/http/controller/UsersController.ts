import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import FindUserByIdService from '@modules/users/services/FindUserByIdService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      birthDate,
      about,
      avatar,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      username,
      email,
      password,
      firstName,
      lastName,
      birthDate,
      about,
      avatar,
    });

    return res.status(201).json(user);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return res.status(200).json(users);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findUserById = container.resolve(FindUserByIdService);

    const user = await findUserById.execute({ id });

    return res.status(200).json(user);
  }
}
