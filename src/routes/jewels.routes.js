import Router from 'express';
import { jewelsController } from '../controller/jewels.controller.js';
import { jewelsMiddlewares } from '../middlewares/jewels.middleware.js';

const router = Router();

router.get(
  '/jewels',
  jewelsMiddlewares.reportLayer,
  jewelsMiddlewares.validateInfo,
  jewelsController.getAllJewels
);
router.get(
  '/jewels/filters',
  jewelsMiddlewares.reportLayer,
  jewelsController.getWithFilters
);
router.get(
  '/jewels/:id',
  jewelsMiddlewares.reportLayer,
  jewelsMiddlewares.validateId,
  jewelsController.getJewel
);
router.post(
  '/jewels',
  jewelsMiddlewares.reportLayer,
  jewelsMiddlewares.validateBody,
  jewelsController.createJewel
);
router.put(
  '/jewels/:id',
  jewelsMiddlewares.reportLayer,
  jewelsMiddlewares.validateAllData,
  jewelsController.updateJewel
);
router.delete(
  '/jewels/:id',
  jewelsMiddlewares.reportLayer,
  jewelsMiddlewares.validateId,
  jewelsController.deleteJewel
);

export default router;
