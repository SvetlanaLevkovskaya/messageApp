import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  type: string
  placeholder: string
  register: UseFormRegisterReturn<string>
  errors: FieldError | undefined
  hasErrorContainer?: boolean
}

export const Input = ({
  type,
  placeholder,
  register,
  errors,
  hasErrorContainer = false,
}: InputProps) => (
  <div>
    <input
      type={type}
      {...register}
      className="w-[320px] h-[52px] pl-6 pt-[14.5px] pb-[15.5px] pr-2.5 text-base border border-gray-800 rounded-full focus:ring-1 focus:ring-teal-600 focus:outline-none"
      placeholder={placeholder}
    />


      <div className={hasErrorContainer ? 'min-h-[48px]' : ''}>
        {errors && (
        <p className="text-rose-700 p-2 bg-rose-100 text-base mt-1.5 w-fit rounded-md mx-auto">
          {errors.message}
        </p>
        )}
      </div>

  </div>
)
