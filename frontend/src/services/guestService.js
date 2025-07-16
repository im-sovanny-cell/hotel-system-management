import api from './api'; // <-- Import the configured api instance

const getAll = () => api.get("/guests");
const create = (data) => api.post("/guests", data);
const update = (id, data) => api.put(`/guests/${id}`, data);
const remove = (id) => api.delete(`/guests/${id}`);

const GuestService = { getAll, create, update, remove };
export default GuestService;