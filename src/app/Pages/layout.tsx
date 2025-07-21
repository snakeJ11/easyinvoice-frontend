// src/app/layout.tsx

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import Layout from '@/components/Layout'
import '../globals.css' // si tienes estilos globales

export const metadata = {
  title: 'EasyInvoice',
  description: 'App de gestión de facturas'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
  
        <ThemeProvider attribute="class" defaultTheme="light">
          <Layout>
            {children}
            <Toaster />
          </Layout>
        </ThemeProvider>
    
  )
}
