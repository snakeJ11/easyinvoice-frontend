'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
    console.log('Token:', t)

    if (!t) {
      router.replace('/login')
    }
  }, [])
}
