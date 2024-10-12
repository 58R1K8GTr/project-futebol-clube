import { Request, Router, Response } from 'express';
import { IRequestWithUser } from '../Interfaces/IRequestWithId';
import LoginRoleController from '../controllers/loginRoleController';
import authMiddleware from '../middlewares/auth';

const router = Router();

// essa rota só tem um método estático pois não utiliza o this.
router.get(
  '/',
  authMiddleware,
  (req: Request, res: Response) => LoginRoleController.getRole(req as IRequestWithUser, res),
);

export default router;
