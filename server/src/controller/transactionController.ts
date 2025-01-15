import { NextFunction, Request, Response } from "express";
import { initializeDatabase } from "../seed";
import { success } from "../middlewares/successHandler";
import { ITransactionService } from "../interfaces/IService";



export class TransactionController {
    private transactionService
    constructor(transactionService: ITransactionService) {
        this.transactionService = transactionService
    }

    async initialize(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await initializeDatabase();
            return success(res, { data: result })
        } catch (error) {
            next(error);
        }
    }

    async getAllTransaction(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, pageSize, search } = req.query;
            const searchQuery = (search as string) || '';
            const pageQuery = parseInt(page as string, 10) || 0;
            const pageSizeQuery = parseInt(pageSize as string, 10) || 10;

            const data = await this.transactionService.AllTransaction(searchQuery, pageQuery, pageSizeQuery)
            return success(res,{data})
        } catch (error) {
            next(error)
        }
    }
}