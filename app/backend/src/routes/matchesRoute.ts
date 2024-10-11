import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import verifyAdmin from '../middlewares/verifyAdmin';
import authMiddleware from '../middlewares/auth';

const matchesController = new MatchesController();

const router = Router();

router.patch(
  '/:id/finish',
  authMiddleware,
  verifyAdmin,
  (req: Request, res: Response) => matchesController.changeMatchToFinished(req, res),
);
router.patch(
  '/:id',
  authMiddleware,
  verifyAdmin,
  (req: Request, res: Response) => matchesController.updateTeamGoals(req, res),
);
router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default router;
