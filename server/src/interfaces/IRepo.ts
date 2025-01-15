import { Month } from "../constants/month";
import { ITransactionDoc } from "../models/TransactionModel";


export interface ITransactionRepo {
    getAllTransactions(search: string, page: number, pageSize: number): Promise<ITransactionDoc[]>
}

export interface IStatisticRepo {
    totalSaleOfMonth(month:Month): Promise<any>
    totalNumberOfSoldItem(month: Month): Promise<any>
    totalNumberOfUnSoldItem(month: Month): Promise<any>
    uniqueCategoryAndNumberOfItem(month:Month): Promise<any>
}