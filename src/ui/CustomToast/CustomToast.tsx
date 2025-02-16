import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const customToastSuccess = (text: string) => {
  return toast.success(text, {
    theme: 'light',
    autoClose: 5000,
  })
}

export const customToastError = (text: string) => {
  return toast.error(text, {
    theme: 'light',
    autoClose: 1500,
  })
}
