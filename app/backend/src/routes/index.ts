import { Router } from 'express';
import teamsRouter from './teamsRoute';
import loginRouter from './loginRoute';
import loginRoleRouter from './loginRoleRoute';
import matchesRouter from './matchesRoute';
import leaderboardRoute from './leaderboardRoute';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/login/role', loginRoleRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard/home', leaderboardRoute);

export default router;
