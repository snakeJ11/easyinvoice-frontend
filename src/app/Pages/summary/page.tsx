'use client'

import { useEffect, useState } from 'react'
import { downloadMonthlyPdf, getMonthlySummary } from '@/services/invoiceService'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function SummaryPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [data, setData] = useState<any>()

  useEffect(() => {
    fetchData()
  }, [month, year])

  const fetchData = async () => {
    const summary = await getMonthlySummary(year,month)
    setData(summary)
  }


  const handleDownloadPDF = async () => {
  const blob = await downloadMonthlyPdf(month,year)
  const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `Resumen_${month}_${year}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.remove()
  }

 

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Resumen financiero</h1>

      {/* Selector de mes/año */}
      <div className="flex gap-4 mb-6">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-2 bg-gray-800 rounded">
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} - {new Date(0, i).toLocaleString('es', { month: 'long' })}</option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="p-2 rounded w-28"
        />
      </div>

      {/* Gráfico */}
      <div className="h-64 bg-white dark:bg-gray-800 rounded shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.days}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="paid" fill="#4ade80" name="Pagado" />
            <Bar dataKey="pending" fill="#facc15" name="Pendiente" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Totales */}
      <div className="mt-6 space-y-2">
        <p>💰 Total facturado: <strong>${data?.totalInvoices?.toFixed(2) || '0.00'}</strong></p>
        <p>✅ Total pagado: <strong>${data?.paidInvoices?.toFixed(2) || '0.00'}</strong></p>
        <p>🕒 Total pendiente: <strong>${data?.pendingInvoices?.toFixed(2) || '0.00'}</strong></p>
      </div>

   <button
  onClick={handleDownloadPDF}
  className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  📄 Exportar como PDF
</button>

    </div>
  )
}
