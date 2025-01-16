import { Month } from "../constants/month";
import { IStatisticRepo } from "../interfaces/IRepo";
import { IStatisticsService } from "../interfaces/IService";
import { transformBarChartData } from "../utils/transformBarChartData";

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
            totalSaleOfMonth: totalSaleOfMonth?.[0] || { count: 0 },
            totalNumberOfSoldItem: totalNumberOfSoldItem?.[0] || { count: 0 },
            totalNumberOfUnSoldItem: totalNumberOfUnSoldItem?.[0] || { count: 0 }
        }
    }
    async unique_category_and_number_of_items_from_that_category(month: string = 'Mar'): Promise<any> {
        if (!Object.values(Month).includes(month as Month)) {
            throw new Error(`Invalid month: ${month}. Valid months are: ${Object.values(Month).join(", ")}`);
        }
        const monthEnum = month as Month;
        return await this.statisticsRepo.uniqueCategoryAndNumberOfItem(monthEnum)
    }
    async priceRange_and_NumberOfItems_forBarChart(month: string): Promise<any> {
        if (!Object.values(Month).includes(month as Month)) {
            throw new Error(`Invalid month: ${month}. Valid months are: ${Object.values(Month).join(", ")}`);
        }
        const monthEnum = month as Month;
        const data = await this.statisticsRepo.barChartRepo_with_priceRange_and_numberOfItems(monthEnum);
        const transformedData = transformBarChartData(data[0])
        console.log(data)
        console.log(transformedData)
        return transformedData
    }
}