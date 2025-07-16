import api from './api';

const getAll = () => api.get("/bookings");
const create = (data) => api.post("/bookings", data);
const update = (id, data) => api.put(`/bookings/${id}`, data);
const remove = (id) => api.delete(`/bookings/${id}`);
const getUpcomingCount = () => api.get("/bookings/upcoming/count");

const BookingService = { getAll, create, update, remove, getUpcomingCount };
export default BookingService;