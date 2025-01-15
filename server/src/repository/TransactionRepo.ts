import { ITransactionRepo } from "../interfaces/IRepo";
import { ITransactionDoc, TransactionModel } from "../models/TransactionModel";


export class TransactionRepo implements ITransactionRepo {
    async getAllTransactions(search: string, page: number, pageSize: number): Promise<ITransactionDoc[]> {
        const priceRegex = /\d+/;
        const priceMatch = search.match(priceRegex);
        let pagination = [
            { $skip: (page || 0) * (pageSize ?? 5) },
            { $limit: pageSize ?? 5 }
        ]
        return await TransactionModel.aggregate([
            {
                $match: {
                    ...(search ? {
                        $or: [
                            { 'title': { $regex: search, $options: 'i' } },
                            { 'description': { $regex: search, $options: 'i' } },
                            {
                                price: {
                                    $lte: parseFloat(priceMatch?.[0] || '0')
                                }
                            }
                        ]
                    } : {})
                }
            },
            {
                $facet: {
                    transactions: [...pagination],
                    totalCount: [{ $count: 'count' }]
                },
            },
            {
                $project: {
                    transactions: 1,
                    totalCount: { $arrayElemAt: ['$totalCount.count', 0] } // Extract count from the array
                }
            }
        ])
    }
}