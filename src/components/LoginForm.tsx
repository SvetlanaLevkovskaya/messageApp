import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { customToastSuccess, Input } from '../ui'
import { getAuthorizationCode } from '../services/clientApi.ts'

import { validationSchema } from '../utils/validationSchema.ts'
import { yupResolver } from '@hookform/resolvers/yup'


interface FormData {
  idInstance: string
  apiTokenInstance: string
  phoneNumber: string
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null)

    const { idInstance, apiTokenInstance, phoneNumber } = data

    try {
      const code = await getAuthorizationCode(idInstance, apiTokenInstance, Number(phoneNumber))

      customToastSuccess(`Your authorization code: ${code}`)
      localStorage.setItem('idInstance', idInstance)
      localStorage.setItem('apiTokenInstance', apiTokenInstance)
      localStorage.setItem('phoneNumber', phoneNumber)
      navigate('/chat')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <div className="w-full min-w-[504px] mx-auto px-[68px] py-[60px] bg-white rounded-3xl border border-gray-800 flex flex-col gap-3">
      <h1 className="text-[32px] text-center mb-8">Log into WhatsApp Web</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 text-center">
        <Input
          type="text"
          placeholder="ID Instance"
          register={register('idInstance')}
          errors={errors.idInstance}
         />

        <Input
          type="text"
          placeholder="API Token Instance"
          register={register('apiTokenInstance')}
          errors={errors.apiTokenInstance}
        />

        <Input
          type="tel"
          placeholder="Phone number"
          register={register('phoneNumber')}
          errors={errors.phoneNumber}
          hasErrorContainer={true}
        />

        <button
          type="submit"
          className={`px-6 bg-teal-700 text-white font-semibold py-2.5 rounded-full hover:bg-teal-800 transition ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>

      {error && <p className="mt-4 text-center text-lg font-semibold text-rose-700">{error}</p>}
    </div>
  )
}
