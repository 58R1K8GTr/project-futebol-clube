import { Request, Router, Response } from 'express';
import { IRequestWithId } from '../Interfaces/IRequestWithId';
import LoginRoleController from '../controllers/loginRoleController';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get(
  '/',
  authMiddleware,
  (req: Request, res: Response) => LoginRoleController.getRole(req as IRequestWithId, res),
);

export default router;
