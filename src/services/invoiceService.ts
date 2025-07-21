import { Invoice, invoiceUpdate } from '@/types/Facturas.types'
import api from './api'


export const createInvoice = async (data: Invoice) => {
  const userId= localStorage.getItem('userInvoice')
  const res = await api.post(`/invoices/create/${userId}`, data)
  return res.data
}


export const getAllInvoices = async () => {
  const res = await api.get('/invoices/getAll')
  return res.data
}


export const getInvoiceById = async (id: string) => {
  const res = await api.get(`/invoices/getOne/${id}`)
  return res.data
}


export const downloadInvoicePDF = async (id: string) => {
  const res = await api.get(`/invoices/${id}/pdf`, {
    responseType: 'blob',
  })
  return res.data
}

export const getMonthlySummary = async (month: number, year: number, ) => {
  const res = await api.get(`/invoices/summary/${month}/${year}`, )
  return res.data
}


export const downloadMonthlyPdf = async (month: number, year: number, ) => {
  const userId= localStorage.getItem('userInvoice')
  const res = await api.get(`/invoices/summary/${month}/${year}/${userId}/pdf`, )
  return res.data
}

export const updateInvoice = async (id: string, data: invoiceUpdate) => {
  const res = await api.put(`/invoices/update/${id}`, data)
  return res.data
}

export const deleteInvoice = async (id: string) => {
  const res = await api.delete(`/invoices/delete/${id}`)
  return res.data
}

export const getInvoicesByStatus = async (status?: string) => {
  const res = await api.get(`/invoices/byStatus/${status ? `${status}` : ''}`)
  return res.data
}

export const searchInvoices = async (search: string) => {
  const res = await api.get(`/invoices?search=${search}`)
  return res.data
}

