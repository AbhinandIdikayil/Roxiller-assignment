import { ITransactionDoc } from "../models/TransactionModel";


export interface ITransactionRepo {
    getAllTransactions(search: string, page: number, pageSize: number): Promise<ITransactionDoc[]>
}