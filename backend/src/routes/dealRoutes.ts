import { Router } from 'express';
import { DealController } from '../controllers/dealController';
import { DealService } from '../services/dealService';
import bodyParser from 'body-parser'; // To parse JSON request bodies

const router = Router();

// Instantiate services and controllers with dependency injection
const dealService = new DealService();
const dealController = new DealController(dealService);

// Use body-parser middleware for routes that expect a JSON body
const jsonParser = bodyParser.json();

// Define routes
router.get('/', (req, res, next) => dealController.getAllDeals(req, res, next));
router.get('/:id', (req, res, next) => dealController.getDealById(req, res, next));
router.post('/', jsonParser, (req, res, next) => dealController.createDeal(req, res, next));
router.put('/:id', jsonParser, (req, res, next) => dealController.updateDeal(req, res, next));
router.delete('/:id', (req, res, next) => dealController.deleteDeal(req, res, next));

export default router;
