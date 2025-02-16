import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  idInstance: yup.string().required('Enter ID Instance.'),
  apiTokenInstance: yup.string().required('Enter API Token Instance.'),
  phoneNumber: yup.string()
                  .required('Enter phone number.')
                  .matches(/^\d+$/, 'Valid phone number is required.')

})
