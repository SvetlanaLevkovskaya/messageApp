import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type InputTypeNamespace = 'text' | 'tel'

interface InputProps {
  type?: InputTypeNamespace
  placeholder: string
  register: UseFormRegisterReturn<string>
  errors: FieldError | undefined
}

export const Input = ({ type = 'text', placeholder, register, errors }: InputProps) => (
  <div className="transition-all">
    <input
      type={type}
      {...register}
      className={`w-[320px] h-[52px] pl-6 pt-[14.5px] pb-[15.5px] pr-2.5 text-base border rounded-full border-gray-800 focus:border-teal-500 transition-all outline-none`}
      placeholder={placeholder}
    />

    <div className={`min-h-[24px]`}>
      {errors && (
        <p className="text-rose-700 text-base w-fit rounded-md mx-auto transition-all">
          {errors.message}
        </p>
      )}
    </div>
  </div>
)
