import { Month } from "../constants/month";
import { IStatisticRepo } from "../interfaces/IRepo";
import { IStatisticsService } from "../interfaces/IService";

export class StatisticsService implements IStatisticsService {
    private statisticsRepo: IStatisticRepo
    constructor(statisticsRepo: IStatisticRepo) {
        this.statisticsRepo = statisticsRepo
    }
    async total_sales_and_total_number_of_sold_and_unsold(month: string): Promise<any> {
        if (!Object.values(Month).includes(month as Month)) {
            throw new Error(`Invalid month: ${month}. Valid months are: ${Object.values(Month).join(", ")}`);
        }
        const monthEnum = month as Month;

        const totalSaleOfMonth = await this.statisticsRepo.totalSaleOfMonth(monthEnum)
        const totalNumberOfSoldItem = await this.statisticsRepo.totalNumberOfSoldItem(monthEnum)
        const totalNumberOfUnSoldItem = await this.statisticsRepo.totalNumberOfUnSoldItem(monthEnum)
        return {
            totalSaleOfMonth,
            totalNumberOfSoldItem,
            totalNumberOfUnSoldItem
        }
    }
}