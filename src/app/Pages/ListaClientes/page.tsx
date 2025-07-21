'use client';

import { useEffect, useState } from 'react'
import { deleteClient, getAllClients } from '@/services/clientService'
import Link from 'next/link'
import { Client } from '@/types/Facturas.types'

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getAllClients()
      .then(setClients)
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      await deleteClient(id)
      const updated = await getAllClients()
      setClients(updated)
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Clientes</h1>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link href="/Pages/CrearCliente" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Nuevo Cliente
        </Link>
      </div>

      {loading ? (
        <p>Cargando clientes...</p>
      ) : filteredClients.length === 0 ? (
        <p>No hay clientes que coincidan con la búsqueda.</p>
      ) : (
        <div className="space-y-3">
          {filteredClients.map(client => (
            <Link key={client._id} href={`/Pages/EditarCliente/?_id=${client._id}`}>
              <div className="bg-white mb-5 dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <p className="font-bold">{client.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{client.email}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {client.phone} 
                </p>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete(client._id)
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  🗑 Eliminar
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
