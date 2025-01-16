import { Month } from "../constants/month";
import { ITransactionDoc } from "../models/TransactionModel";


export interface ITransactionRepo {
    getAllTransactions(search: string, page: number, pageSize: number, month:Month): Promise<ITransactionDoc[]>
}

export interface IStatisticRepo {
    totalSaleOfMonth(month:Month): Promise<any>
    totalNumberOfSoldItem(month: Month): Promise<any>
    totalNumberOfUnSoldItem(month: Month): Promise<any>
    uniqueCategoryAndNumberOfItem(month:Month): Promise<any>
    barChartRepo_with_priceRange_and_numberOfItems(month: Month): Promise<any>
}