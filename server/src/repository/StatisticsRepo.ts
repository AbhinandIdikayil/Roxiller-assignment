import { Month } from "../constants/month";
import { IStatisticRepo } from "../interfaces/IRepo";
import { TransactionModel } from "../models/TransactionModel";


export class StatisticsRepo implements IStatisticRepo {
    async totalSaleOfMonth(month: Month): Promise<any> {
        return await TransactionModel.aggregate([
            {
                $project: {
                    month: { $dateToString: { format: "%b", date: "$dateOfSale", timezone: "+04:30" } },
                    price: 1, // Assuming `price` is the field representing the sale amount
                    sold: 1,
                    dateOfSale: 1
                }

            },
            {
                $match: {
                    'sold': true,
                    'month': month
                }
            },
            {
                $group: {
                    _id: '$month',
                    totalSales: { $sum: '$price' }
                }
            }
        ])
    }
    async totalNumberOfSoldItem(month: Month): Promise<any> {
        return await TransactionModel.aggregate([
            {
                $project: {
                    month: { $dateToString: { format: "%b", date: "$dateOfSale", timezone: "+04:30" } },
                    price: 1, // Assuming `price` is the field representing the sale amount
                    sold: 1,
                    dateOfSale: 1
                }

            },
            {
                $match: {
                    'sold': true,
                    'month': month
                }
            },
            {
                $count: 'count'
            }
        ])
    }
    async totalNumberOfUnSoldItem(month: Month): Promise<any> {
        return await TransactionModel.aggregate([
            {
                $project: {
                    month: { $dateToString: { format: "%b", date: "$dateOfSale", timezone: "+04:30" } },
                    price: 1, // Assuming `price` is the field representing the sale amount
                    sold: 1,
                    dateOfSale: 1
                }

            },
            {
                $match: {
                    'sold': false,
                    'month': month
                }
            },
            {
                $count: 'count'
            }
        ])
    }
}