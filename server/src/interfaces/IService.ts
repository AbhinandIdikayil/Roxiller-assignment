import { Month } from "../constants/month";
import { ITransactionDoc } from "../models/TransactionModel";

export interface ITransactionService {
    AllTransaction(search: string, page: number, pageSize: number): Promise<ITransactionDoc[]>
}


export interface IStatisticsService {
    total_sales_and_total_number_of_sold_and_unsold(month:string): Promise<any>
}