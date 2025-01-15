import { ITransactionRepo } from "../interfaces/IRepo";
import { ITransactionService } from "../interfaces/IService";
import { ITransactionDoc } from "../models/TransactionModel";
import ErrorResponse from "../utils/errorResponse";


export class TransactionService implements ITransactionService {
    private transactionRepo: ITransactionRepo
    constructor(transactionRepo: ITransactionRepo) {
        this.transactionRepo = transactionRepo
    }
    async AllTransaction(search: string, page: number, pageSize: number): Promise<ITransactionDoc[]> {
        if (page < 0) {
            throw ErrorResponse.badRequest('Page should be lessthan 0');
        }
        const data = await this.transactionRepo.getAllTransactions(search, page, pageSize);
        return data
    }
}