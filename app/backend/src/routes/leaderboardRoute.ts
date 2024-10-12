import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardController = new LeaderboardController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboardHome(req, res),
);

export default router;
