import FavoritePiuService from '@modules/users/services/FavoritePiuService';
import UnfavoritePiuService from '@modules/users/services/UnfavoritePiuService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FavoritesController {
  public async favorite(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.params;
    const userId = req.user.id;

    const favoritePiu = container.resolve(FavoritePiuService);

    const user = await favoritePiu.execute({ id, userId });

    return res.json(user);
  }

  public async unfavorite(req: Request, res: Response): Promise<Response> {
    const {
      id,
    } = req.params;
    const userId = req.user.id;

    const unfavoritePiu = container.resolve(UnfavoritePiuService);

    const user = await unfavoritePiu.execute({ id, userId });

    return res.json(user);
  }
}
