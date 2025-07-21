import '../globals.css'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center text-gray-900">
      <div className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 dark:text-white transition-all duration-500">
        {children}
      </div>
    </div>
  )
}
