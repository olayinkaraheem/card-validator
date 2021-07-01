import express from "express";
import PaymentController from "../controllers/payment.controller";

const controller = new PaymentController();

const router = express.Router();

// router.get('/validate', controller.validateCardDetails);
router.post('/validate', controller.validateCardDetails);

export default router;