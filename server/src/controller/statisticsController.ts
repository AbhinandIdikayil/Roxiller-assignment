import { NextFunction, Request, Response } from "express";
import { IStatisticsService } from "../interfaces/IService";
import ErrorResponse from "../utils/errorResponse";
import { success } from "../middlewares/successHandler";


export class StatisticsController {
    private statisticsService: IStatisticsService
    constructor(statisticsService: IStatisticsService) {
        this.statisticsService = statisticsService
    }
    async monthBasedStatistics(req: Request, res: Response, next: NextFunction) {
        try {
            const { month } = req.query
            if (!month) {
                throw ErrorResponse.badRequest('provide month in query')
            }
            const total_sales_on_month = await this.statisticsService.total_sales_and_total_number_of_sold_and_unsold(month as string)

            const data = {
                total_sales_on_month
            }
            return success(res, { data })
        } catch (error) {
            next(error)
        }
    }

    async pieChart(req: Request, res: Response, next: NextFunction) {
        try {
            const { month } = req.query
            const data = await this.statisticsService.unique_category_and_number_of_items_from_that_category(month as string)
            return success(res, { data })
        } catch (error) {
            next(error)
        }
    }
}