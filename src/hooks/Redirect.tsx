import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
  const router = useRouter()
  const isAuthenticated = !!localStorage.getItem('token')

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated])
}
