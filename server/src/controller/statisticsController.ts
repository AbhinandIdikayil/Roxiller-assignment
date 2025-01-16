import { NextFunction, Request, Response } from "express";
import { IStatisticsService } from "../interfaces/IService";
import ErrorResponse from "../utils/errorResponse";
import { success } from "../middlewares/successHandler";
import { CONFIG } from "../constants/env";
import axios from "axios";

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


            return success(res, { data: total_sales_on_month })
        } catch (error) {
            next(error)
        }
    }

    async pieChart(req: Request, res: Response, next: NextFunction) {
        try {
            const { month } = req.query
            if (!month) {
                throw ErrorResponse.badRequest('provide month in query')
            }
            const data = await this.statisticsService.unique_category_and_number_of_items_from_that_category(month as string)
            return success(res, { data })
        } catch (error) {
            next(error)
        }
    }

    async barChart(req: Request, res: Response, next: NextFunction) {
        try {
            const { month } = req.query
            if (!month) {
                throw ErrorResponse.badRequest('provide month in query')
            }
            const data = await this.statisticsService.priceRange_and_NumberOfItems_forBarChart(month as string)
            return success(res, { data })
        } catch (error) {
            next(error);
        }
    }
    async combinedStatistics(req: Request, res: Response, next: NextFunction) {
        try {
            const monthUrl = CONFIG.SERVER_URL + `/api/statistics/month?month=${CONFIG.DEFAULT_MONTH}`
            const pieChart = CONFIG.SERVER_URL + `/api/statistics/pie-chart?month=${CONFIG.DEFAULT_MONTH}`
            const barChart = CONFIG.SERVER_URL + `/api/statistics/bar-chart?month=${CONFIG.DEFAULT_MONTH}`
            const [monthData, pieChartData, barChartData] = await Promise.all([
                axios.get(monthUrl),
                axios.get(pieChart),
                axios.get(barChart),
            ])
            const combinedData = {
                month: monthData.data,
                pieChart: pieChartData.data,
                barChart: barChartData.data
            };

            return success(res,{data:combinedData})
        } catch (error) {
            next(error)
        }
    }
}