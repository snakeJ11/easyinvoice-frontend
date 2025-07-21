//import './globals.css' // si tienes estilos globales
import { Toaster } from 'react-hot-toast'

export default function PrincipalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
        <body>
           <Toaster position="top-right" reverseOrder={false} />
        <div className="">

          {children}
        </div>
        </body>
    </html>
  )
}
