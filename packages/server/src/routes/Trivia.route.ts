// Modules
import path from 'path';
import { Router } from 'express';

// Router
export const TriviaRouter = Router();

/**
 * GET
 */
TriviaRouter.get('*', (req, res) => {
  res.sendFile(path.resolve('../../node_modules/client/lib/index.html'));
});
