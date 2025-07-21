'use client'

import { ChangeEventHandler, useEffect, useState } from 'react'
import { getInvoicesByStatus, getAllInvoices } from '@/services/invoiceService'
import Link from 'next/link'
import { Client, Invoice } from '@/types/Facturas.types'

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([])
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all')
  const [search, setSearch] = useState('')

  const fetchInvoices = async () => {
    if (filter === 'all') {
      const results = await getAllInvoices()
      setInvoices(results)
    } else {
      const data = await getInvoicesByStatus(filter)
      setInvoices(data)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [filter])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearch(e.target.value);
}

  // 🔍 Aplicar filtro por búsqueda en pantalla
  const filteredInvoices = invoices.filter((inv: Invoice) => {
let name = '';
  if (typeof inv.clientId === 'object' && inv.clientId !== null && 'name' in inv.clientId) {
    name = (inv.clientId.name as string).toLowerCase();
  }    const number = (inv.number || '').toString()
    const searchLower = search.toLowerCase()
    return name.includes(searchLower) || number.includes(searchLower)
  })

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Facturas</h1>

        {/* 🔍 Buscador */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar por cliente"
            value={search}
            onChange={handleSearchChange}
            className="flex-1 p-2 rounded bg-white dark:bg-gray-800"
          />
        </div>

        {/* 🎯 Filtros */}
        <div className="flex gap-4">
          {['all', 'pending', 'paid'].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
              }`}
              onClick={() => {
                setFilter(f as 'all' | 'paid' | 'pending')
                setSearch('') // limpiar búsqueda al cambiar filtro
              }}
            >
              {f === 'all' ? 'Todas' : f === 'paid' ? 'Pagadas' : 'Pendientes'}
            </button>
          ))}
        </div>

        {/* 📄 Lista */}
        <div className="bg-white dark:bg-gray-800 rounded shadow">
          {filteredInvoices.length === 0 ? (
            <p className="p-4">No hay facturas que coincidan.</p>
          ) : (
            <ul>
              {filteredInvoices.map((inv: Invoice) => (
                <li
                  key={inv._id}
                  className="flex justify-between items-center p-4 border-b dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium">
                     #{inv.number || inv._id?.slice(-5)} – {
  typeof inv.clientId === 'object' && inv.clientId !== null && 'name' in inv.clientId
    ? (inv.clientId as Client).name
    : 'Cliente'
}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Estado: {inv.status === 'paid' ? 'Pagada' : 'Pendiente'} • Total: $
                      {inv.total?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/Pages/EditarFactura/?_id=${inv._id}`} className="text-blue-500 hover:underline text-sm">
                      ✏ Editar
                    </Link>
                    <Link href={`/Pages/DetalleFactura/?_id=${inv._id}`} className="text-green-600 hover:underline text-sm">
                      📄 Detalle
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
