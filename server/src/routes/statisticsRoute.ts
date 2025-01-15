import { Router } from 'express'
import { StatisticsRepo } from '../repository/StatisticsRepo';
import { StatisticsService } from '../service/statisticsService';
import { StatisticsController } from '../controller/statisticsController';
const statisticsRouter = Router();

const statisticsRepo = new StatisticsRepo();
const statisticsService = new StatisticsService(statisticsRepo);
const statisticsController = new StatisticsController(statisticsService);

statisticsRouter.route('/month').get(statisticsController.monthBasedStatistics.bind(statisticsController));

statisticsRouter.route('/pie-chart').get(statisticsController.pieChart.bind(statisticsController))

statisticsRouter.route('/bar-chart').get(statisticsController.barChart.bind(statisticsController))

export { statisticsRouter }