import { del, get, post, put } from "./api";


export const subEmployerService = {
    // Create a new subemployer
    create: async (data) => {
        const response = await post('subemployer/create', data);
        return response.data;
    },

    // Get all subemployers for a specific employer
    getByEmployer: async (parentEmployerId) => {
        const response = await post(`subemployer/employer/${parentEmployerId}`);
        return response.data.subEmployers;
    },

    // Get specific subemployer by ID
    getById: async (id) => {
        const response = await get(`subemployer/${id}`);
        return response.data;
    },

    // Update subemployer
    update: async (id, data) => {
        const response = await put(`subemployer/${id}`, data);
        return response.data;
    },

    // Deactivate subemployer
    delete: async (id) => {
        const response = await del(`subemployer/${id}`);
        return response.data;
    }
};