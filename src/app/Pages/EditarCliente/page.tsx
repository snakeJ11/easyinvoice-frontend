'use client';

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { updateClient, getAllClients } from '@/services/clientService'
import toast from 'react-hot-toast'
import { Client } from '@/types/Facturas.types'

export default function EditClientPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('_id')

  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      getAllClients().then(clients => {
        const found = clients.find((c: Client) => c._id === id)
        if (found) {
          setForm({ name: found.name, email: found.email, phone: found.phone })
        } else {
          toast.error('Cliente no encontrado')
          router.push('/ListaClientes')
        }
      })
    }
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!id) return
      await updateClient(id, form)
      toast.success('Cliente actualizado con éxito')
      router.push('/clients')
    } catch (err) {
      toast.error('Error al actualizar cliente')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <h1 className="text-xl font-bold">Editar Cliente</h1>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Actualizar
        </button>
      </form>
    </div>
  )
}
