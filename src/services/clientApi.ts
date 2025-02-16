import axios from 'axios'


export const handleApiError = (error: unknown): string => {
  let errorMessage = 'Unexpected Error'

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.message)
      errorMessage = error.message || error.response.statusText
    } else if (error.request) {
      console.error('No Response Error:', error.request.statusText)
      errorMessage = error.request.statusText || 'No Response from server'
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    errorMessage = error.message
  } else {
    console.error('Unexpected Error:', error)
    errorMessage = error as string
  }

  return errorMessage
}

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_GREEN_API_BASE_URL,
});


instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

export const getAuthorizationCode = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: number
): Promise<string> => {
  try {
    const response = await instanceAxios.post(
      `/waInstance${idInstance}/getAuthorizationCode/${apiTokenInstance}`,
      { phoneNumber: Number(phoneNumber) }
    );

    if (response.data.status) {
      return response.data.code;
    } else {
      throw new Error('Failed to retrieve the authorization code. Please try again.');
    }
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
