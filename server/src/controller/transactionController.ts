import { NextFunction, Request, Response } from "express";
import { initializeDatabase } from "../seed";
import { success } from "../middlewares/successHandler";
import { ITransactionService } from "../interfaces/IService";
import ErrorResponse from "../utils/errorResponse";



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
            const { page, pageSize, search, month } = req.query;
            const searchQuery = (search as string) || '';
            const pageQuery = parseInt(page as string, 10) || 0;
            const pageSizeQuery = parseInt(pageSize as string, 10) || 10;
            if (!month) {
                throw ErrorResponse.badRequest('provide month in query')
            }

            const data = await this.transactionService.AllTransaction(searchQuery, pageQuery, pageSizeQuery, month as string)
            return success(res, { data: data[0] })
        } catch (error) {
            next(error)
        }
    }
}