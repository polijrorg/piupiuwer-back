import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePiuService from '@modules/pius/services/CreatePiuService';
import ListPiusService from '@modules/pius/services/ListPiusService';
import FindPiuByIdService from '@modules/pius/services/FindPiuByIdService';
import DeletePiuService from '@modules/pius/services/DeletePiuService';
import ToggleLikePiuService from '@modules/pius/services/ToggleLikePiuService';

export default class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      text,
    } = req.body;
    const userId = req.user.id;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({
      text, userId,
    });

    return res.status(201).json(piu);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const listPius = container.resolve(ListPiusService);

    const pius = await listPius.execute();

    return res.status(200).json(pius);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findPiuById = container.resolve(FindPiuByIdService);

    const piu = await findPiuById.execute({ id });

    return res.status(200).json(piu);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;

    const deletePiu = container.resolve(DeletePiuService);

    await deletePiu.execute({ id, userId });

    return res.status(200).json();
  }

  public async like(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;

    const likePiu = container.resolve(ToggleLikePiuService);

    const { piu, operation } = await likePiu.execute({ id, userId });

    return res.status(200).json({ piu, operation });
  }
}
