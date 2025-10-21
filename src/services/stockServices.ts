import axios from 'axios'
import { URLBACKEND } from '../../conf.env'

// Configurar axios con la URL base
axios.defaults.baseURL = URLBACKEND

export const stockService = {
  async getStocks(
    filters: Record<string, any>,
    search: string,
    page: number,
    pageSize: number = 10,
  ) {
    const params: Record<string, any> = { page, pageSize }

    if (filters.brokerage) params.analyst = filters.brokerage
    if (filters.action) params.action = filters.action
    if (filters.rating) params.rating = filters.rating
    if (filters.dateOrder) params.dateOrder = filters.dateOrder
    if (filters.sector) params.sector = filters.sector
    if (search) params.search = search

    const response = await axios.get('/stocks', { params })
    return response.data
  },

  async getTopStocks() {
    const response = await axios.get('/stocks/topStocks') // Usa URL relativa
    return response.data
  },
}
