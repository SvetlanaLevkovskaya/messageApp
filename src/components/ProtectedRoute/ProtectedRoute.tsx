import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthData } from '@hooks/useAuthData'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { idInstance, apiTokenInstance } = useAuthData()

  if (!idInstance || !apiTokenInstance) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
