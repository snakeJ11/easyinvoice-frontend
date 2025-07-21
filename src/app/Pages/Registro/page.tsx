'use client';

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import FormInput from '@/components/FormInput'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí va la llamada a la API con Axios
    console.log('Registro data:', form)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Crear Cuenta</h1>

        <FormInput label="Nombre completo" name="name" value={form.name} onChange={handleChange} />
        <FormInput label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} />
        <FormInput label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Registrarse
        </button>

        <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-green-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  )
}
