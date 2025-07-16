import api from './api';

const getRevenueByRoomType = () => {
    return api.get("/stats/reports/revenue-by-room-type");
};

const ReportingService = { getRevenueByRoomType };
export default ReportingService;