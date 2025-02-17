import { useState, useEffect } from 'react'

export const useAuthData = () => {
  const [idInstance, setIdInstance] = useState<string | null>(localStorage.getItem('idInstance'))
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(localStorage.getItem('apiTokenInstance'))
  const [phoneNumber, setPhoneNumber] = useState<string | null>(localStorage.getItem('phoneNumber'))

  useEffect(() => {
    const handleStorageChange = () => {
      setIdInstance(localStorage.getItem('idInstance'))
      setApiTokenInstance(localStorage.getItem('apiTokenInstance'))
      setPhoneNumber(localStorage.getItem('phoneNumber'))
    }


    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return { idInstance, apiTokenInstance, phoneNumber }
}
