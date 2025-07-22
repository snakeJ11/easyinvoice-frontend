'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // 💡 evitar errores de hidratación
const links = [
  { href: '/Pages/summary', label: 'Resumen financiero' },           
  { href: '/Pages/CrearCliente', label: 'Crear Clientes' },
  { href: '/Pages/ListaClientes', label: 'Lista de Clientes' }, 
  { href: '/Pages/Factura', label: 'Crear factura' }, 
  { href: '/Pages/ListaFactura', label: 'Lista de facturas' },    
   
]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
                     <title>EasyInvoice</title>

      <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <h1 className="font-bold text-xl text-blue-600">EasyInvoice</h1>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline ${pathname?.startsWith(link.href) ? 'font-semibold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 items-center">
     

          <button
            onClick={() => {
              localStorage.removeItem('token')
              toast('Sesión cerrada')
              router.push('/')
            }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="flex-1 p-4">{children}</main>
    </div>
  )
}
