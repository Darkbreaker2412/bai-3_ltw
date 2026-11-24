import axiosClient from './axiosClient'

export const getHotels = (params) => axiosClient.get('/hotels', { params })       // GET
export const getHotelById = (id) => axiosClient.get(`/hotels/${id}`)              // GET
export const createHotel = (data) => axiosClient.post('/hotels', data)            // POST
export const updateHotel = (id, data) => axiosClient.put(`/hotels/${id}`, data)   // PUT
export const deleteHotel = (id) => axiosClient.delete(`/hotels/${id}`)            // DELETE
