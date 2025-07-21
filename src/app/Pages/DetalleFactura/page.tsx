'use client';

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getInvoiceById } from '@/services/invoiceService'
import { downloadInvoicePDF } from '@/services/invoiceService'
import { Client, Invoice, Item } from '@/types/Facturas.types'

export default function InvoiceDetail() {
  const [invoice, setInvoice] = useState<Invoice>()
  const [loading, setLoading] = useState(true)

   const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('_id')

  useEffect(() => {
    if (id) {
      getInvoiceById(id as string)
        .then(setInvoice)
        .finally(() => setLoading(false))
console.log(loading)
    }
  }, [id, router])

  if (!invoice) return <p className="p-6">Factura no encontrada</p>


  const handleDownloadPDF = async () => {
  const blob = await downloadInvoicePDF(invoice._id as string )
  const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `Factura_${invoice.number || invoice._id}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
            console.log('Invoice', invoice)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Factura #{invoice.invoiceNumber}</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-2">
<p>
  <strong>Cliente:</strong> {
    typeof invoice.clientId === 'object' && invoice.clientId !== null && 'name' in invoice.clientId
      ? (invoice.clientId as Client).name
      : invoice.clientId // fallback to string or show 'Cliente'
  }
</p>
<p><strong>Fecha:</strong> {invoice.issuedAt instanceof Date ? invoice.issuedAt.toISOString().slice(0, 10) : invoice.issuedAt}</p>
        <p><strong>Estado:</strong> {invoice.status === 'paid' ? 'Pagada' : 'Pendiente'}</p>
        <p><strong>Subtotal:</strong> ${invoice.subtotal.toFixed(2)}</p>
        <p><strong>Impuestos:</strong> ${invoice.taxAmount.toFixed(2)}</p>
        <p><strong>Total:</strong> ${invoice.total?.toFixed(2)}</p>

        <h2 className="text-xl font-semibold mt-4">Items:</h2>
        <ul className="list-disc pl-6">
          {invoice.items.map((item: Item, i: number) => (
            <li key={i}>
              {item.description} - {item.quantity} x ${item.unitPrice} = ${item.total}
      
              </li>
            ))}
        </ul>
            <button
          onClick={handleDownloadPDF}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📥 Descargar PDF
        </button>
      </div>
    </div>
  )
}
