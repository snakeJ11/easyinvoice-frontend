'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoginService } from '@/services/loginService'
import toast from 'react-hot-toast'
import '../globals.css' 


export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await LoginService(email, password)
      const token = res.data.access_token
      const userID = res.data.user._id

      localStorage.setItem('tokenInvoice', token)
      localStorage.setItem('userInvoice', userID)

      toast.success('Inicio de sesión exitoso')
      router.push('/Pages/summary')
    } catch (err) {
      toast.error('Credenciales inválidas')
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-4">Bienvenido 👋</h2>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        Ingresa tus credenciales para continuar
      </p>

      <div>
        <label className="block mb-1 text-sm font-medium">Correo</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@example.com"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white font-semibold ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } transition duration-300`}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
