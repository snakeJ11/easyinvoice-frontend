'use client';

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createInvoice } from '@/services/invoiceService'
import { getAllClients } from '@/services/clientService'
import { Client, Item } from '@/types/Facturas.types'

export default function NewInvoicePage() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState('')
  const [items, setItems] = useState<Item[]>([]);
  const [taxRate, setTaxRate] = useState(18) // 18% por defecto

  const router = useRouter()

  useEffect(() => {
    getAllClients().then(setClients)
  }, [])

const handleItemChange = (
  index: number,
  field: keyof Item,
  value: string
) => {
  const updated = [...items];
  updated[index] = {
    ...updated[index],
    [field]: field === 'description' ? value : parseFloat(value),
  };
  setItems(updated);
};


  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }])
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i))

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)
  const tax = (subtotal * taxRate) / 100
  const total = subtotal + tax

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const now = new Date()
  const dueDate = new Date()
  dueDate.setDate(now.getDate() + 30) // ejemplo: vencimiento a 30 días

  await createInvoice({
    clientId: selectedClient,
    items,
    taxRate,
    issuedAt: now,
    dueDate,
    subtotal,
    taxAmount: tax,
    total,
    invoiceNumber: `INV-${Date.now()}`, // número de factura simple
    // status no se incluye, lo pone el backend por defecto
  })

  router.push('/Pages/ListaFactura')
}

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded space-y-4 shadow">
        <h1 className="text-xl font-bold">Crear nueva factura</h1>

        <label className="block">
          Cliente:
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
            className="w-full mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded"
          >
            <option value="">-- Selecciona un cliente --</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} ({client.email})
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <input
                type="text"
                className="col-span-5 p-2 rounded bg-gray-100 dark:bg-gray-700"
                placeholder="Descripción"
                value={item.description}
                onChange={(e) => handleItemChange(i, 'description', e.target.value)}
                required
              />
              <input
                type="number"
                className="col-span-2 p-2 rounded bg-gray-100 dark:bg-gray-700"
                placeholder="Cantidad"
                value={item.quantity}
                onChange={(e) => handleItemChange(i, 'quantity', e.target.value)}
                required
              />
              <input
                type="number"
                className="col-span-3 p-2 rounded bg-gray-100 dark:bg-gray-700"
                placeholder="Precio unitario"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(i, 'unitPrice', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="col-span-2 text-red-600 hover:underline"
              >
                Quitar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="text-blue-600 hover:underline"
          >
            ➕ Agregar ítem
          </button>
        </div>

        <label className="block">
          Impuesto (%):
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(parseFloat(e.target.value))}
            className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 rounded"
          />
        </label>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>Impuestos:</strong> ${tax.toFixed(2)}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Crear Factura
        </button>
      </form>
    </div>
  )
}
