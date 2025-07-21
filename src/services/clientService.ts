import { form } from '@/types/Facturas.types'
import api from './api'


export const createClient = async (data: form) => {
        const userId= localStorage.getItem('userInvoice')

  const res = await api.post(`/clients/create/${userId}`, data)
  return res.data
}

export const getAllClients = async () => {
  const res = await api.get('/clients/getClients')
  return res.data
}

export const getClient= async (id:string) => {
  const res = await api.get(`/clients/getClient/${id}`)
  return res.data
}



export const updateClient = async (id: string, data: form) => {
  const res = await api.put(`/clients/update/${id}`, data)
  return res.data
}

export const deleteClient = async (id: string) => {
  const res = await api.delete(`/clients/delete/${id}`)
  return res.data
}


