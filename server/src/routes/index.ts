import { Router } from 'express'
import { statisticsRouter } from './statisticsRoute';
import { transactionRouter } from './transactionRoute';
const router = Router();


router.use('/transaction', transactionRouter)

router.use('/statistics', statisticsRouter);

export { router }