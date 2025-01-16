import { Month } from "../constants/month";
import { ITransactionRepo } from "../interfaces/IRepo";
import { ITransactionService } from "../interfaces/IService";
import { ITransactionDoc } from "../models/TransactionModel";
import ErrorResponse from "../utils/errorResponse";


export class TransactionService implements ITransactionService {
    private transactionRepo: ITransactionRepo
    constructor(transactionRepo: ITransactionRepo) {
        this.transactionRepo = transactionRepo
    }
    async AllTransaction(search: string, page: number, pageSize: number, month: string): Promise<ITransactionDoc[]> {
        if (page < 0) {
            throw ErrorResponse.badRequest('Page should be lessthan 0');
        }
        if (!Object.values(Month).includes(month as Month)) {
            throw new Error(`Invalid month: ${month}. Valid months are: ${Object.values(Month).join(", ")}`);
        }
        const monthEnum = month as Month;
        const data = await this.transactionRepo.getAllTransactions(search, page, pageSize, monthEnum);
        return data
    }
}