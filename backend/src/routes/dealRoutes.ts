import express from 'express';
import { DealController } from '../controllers/dealController';

const router = express.Router();
const dealController = new DealController();

router.get('/', (req, res) => dealController.getAllDeals(req, res));
router.get('/:id', (req, res) => dealController.getDealById(req, res));
router.post('/', (req, res) => dealController.createDeal(req, res));
router.put('/:id', (req, res) => dealController.updateDeal(req, res));
router.delete('/:id', (req, res) => dealController.deleteDeal(req, res));

export default router;
