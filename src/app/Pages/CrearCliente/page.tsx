'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/services/clientService'
import toast from 'react-hot-toast'

export default function CreateClientPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createClient(form)
      toast.success('Cliente creado con éxito')
      router.push('Pages/ListaClientes')
    } catch (err) {
      toast.error('Error al crear cliente')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <h1 className="text-xl font-bold">Nuevo Cliente</h1>

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
          Guardar
        </button>
      </form>
    </div>
  )
}
