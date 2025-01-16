import { Month } from "../constants/month";
import { ITransactionDoc } from "../models/TransactionModel";

export interface ITransactionService {
    AllTransaction(search: string, page: number, pageSize: number, month: string): Promise<ITransactionDoc[]>
}


export interface IStatisticsService {
    total_sales_and_total_number_of_sold_and_unsold(month:string): Promise<any>
    unique_category_and_number_of_items_from_that_category(month: string): Promise<any>
    priceRange_and_NumberOfItems_forBarChart(month: string): Promise<any>
}