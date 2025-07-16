import api from './api'; // <-- Import the configured api instance

const getAll = () => api.get("/rooms");
const create = (data) => api.post("/rooms", data);
const update = (id, data) => api.put(`/rooms/${id}`, data);
const remove = (id) => api.delete(`/rooms/${id}`);

const RoomService = { getAll, create, update, remove };
export default RoomService;