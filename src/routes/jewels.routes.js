import Router from 'express';
import { jewelsController } from '../controller/jewels.controller.js';
import { jewelsMiddlewares } from '../middlewares/jewels.middleware.js';

const router = Router();

router.get(
  '/jewels',
  jewelsMiddlewares.validateInfo,
  jewelsController.getAllJewels
);
router.get(
  '/jewels/:id',
  jewelsMiddlewares.validateId,
  jewelsController.getJewel
);
router.post(
  '/jewels',
  jewelsMiddlewares.validateBody,
  jewelsController.createJewel
);
router.put(
  '/jewels/:id',
  jewelsMiddlewares.validateAllData,
  jewelsController.updateJewel
);
router.delete(
  '/jewels/:id',
  jewelsMiddlewares.validateId,
  jewelsController.deleteJewel
);

export default router;
