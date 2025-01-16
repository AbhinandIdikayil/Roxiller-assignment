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
            },
            {
                $project: {
                    totalSales: 1,
                    _id: 0
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
    async uniqueCategoryAndNumberOfItem(month: Month): Promise<any> {
        return await TransactionModel.aggregate([

            {
                $project: {
                    month: { $dateToString: { format: "%b", date: "$dateOfSale", timezone: "+04:30" } },
                    category: 1
                }
            },
            {
                $match: {
                    'month': month
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ])
    }
    async barChartRepo_with_priceRange_and_numberOfItems(month: Month): Promise<any> {
        return await TransactionModel.aggregate([
            {
                $project: {
                    month: { $dateToString: { format: "%b", date: "$dateOfSale", timezone: "+04:30" } },
                    price: 1,
                }
            },
            {
                $match: {
                    'month': month
                }
            },
            {
                $facet: {
                    '0-100': [
                        { $match: { $and: [{ price: { $gte: 0 } }, { price: { $lte: 100 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '101-200': [
                        { $match: { $and: [{ price: { $gte: 101 } }, { price: { $lte: 200 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '201-300': [
                        { $match: { $and: [{ price: { $gte: 201 } }, { price: { $lte: 300 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '301-400': [
                        { $match: { $and: [{ price: { $gte: 301 } }, { price: { $lte: 400 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '401-500': [
                        { $match: { $and: [{ price: { $gte: 401 } }, { price: { $lte: 500 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '501-600': [
                        { $match: { $and: [{ price: { $gte: 501 } }, { price: { $lte: 600 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '601-700': [
                        { $match: { $and: [{ price: { $gte: 601 } }, { price: { $lte: 700 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '701-800': [
                        { $match: { $and: [{ price: { $gte: 701 } }, { price: { $lte: 800 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '801-900': [
                        { $match: { $and: [{ price: { $gte: 801 } }, { price: { $lte: 900 } }] } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ],
                    '901-above': [
                        { $match: { price: { $gte: 901 } } },
                        { $group: { _id: null, count: { $sum: 1 } } },
                    ]
                }
            },
        ])
    }
}