import FollowUserService from '@modules/users/services/FollowUserService';
import UnfollowUserService from '@modules/users/services/UnfollowUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FollowController {
  public async follow(req: Request, res: Response): Promise<Response> {
    const {
      followingId,
    } = req.params;
    const followerId = req.user.id;

    const followUser = container.resolve(FollowUserService);

    const user = await followUser.execute({ followingId, followerId });

    return res.json(user);
  }

  public async unfollow(req: Request, res: Response): Promise<Response> {
    const {
      followingId,
    } = req.params;
    const followerId = req.user.id;

    const unfollowUser = container.resolve(UnfollowUserService);

    const user = await unfollowUser.execute({ followingId, followerId });

    return res.json(user);
  }
}
