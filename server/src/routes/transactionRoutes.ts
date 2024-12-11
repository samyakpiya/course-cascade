import express from "express";
import {
  createStripePaymentIntent,
  createTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/", createTransaction);
router.post("/stripe/payment-intent", createStripePaymentIntent);

export default router;
