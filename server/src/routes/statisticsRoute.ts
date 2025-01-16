import { Router } from 'express'
import { StatisticsRepo } from '../repository/StatisticsRepo';
import { StatisticsService } from '../service/statisticsService';
import { StatisticsController } from '../controller/statisticsController';
import { start } from 'repl';
const statisticsRouter = Router();

const statisticsRepo = new StatisticsRepo();
const statisticsService = new StatisticsService(statisticsRepo);
const statisticsController = new StatisticsController(statisticsService);

/**
 * @description
 *  route to return total amount of sale, total sold items, and total not sold item
 * @param
 *  pass month field as query params
 */
statisticsRouter.route('/month').get(statisticsController.monthBasedStatistics.bind(statisticsController));

statisticsRouter.route('/pie-chart').get(statisticsController.pieChart.bind(statisticsController))

statisticsRouter.route('/bar-chart').get(statisticsController.barChart.bind(statisticsController))


statisticsRouter.route('/combined').get(statisticsController.combinedStatistics.bind(statisticsController));

export { statisticsRouter }