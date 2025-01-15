import { ITransactionDoc } from "../models/TransactionModel";

export interface ITransactionService {
    AllTransaction(search: string, page: number, pageSize: number): Promise<ITransactionDoc[]>
}