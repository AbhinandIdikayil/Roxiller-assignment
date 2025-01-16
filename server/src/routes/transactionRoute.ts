import { Router } from 'express'
import { TransactionController } from '../controller/transactionController';
import { TransactionService } from '../service/transactionService';
import { TransactionRepo } from '../repository/TransactionRepo';
const transactionRouter = Router();

const transactionRepo = new TransactionRepo()
const transactionService = new TransactionService(transactionRepo);
const transactionController = new TransactionController(transactionService);

transactionRouter.route('/init').get(transactionController.initialize.bind(transactionController));


/**
 * @param (page, pageSize, search,month)
 */

transactionRouter.route('/get-all').get(transactionController.getAllTransaction.bind(transactionController))

export { transactionRouter }