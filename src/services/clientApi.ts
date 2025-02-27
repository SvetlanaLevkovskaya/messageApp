import axios from 'axios'
import dayjs from 'dayjs'

export const handleApiError = (error: unknown): string => {
  let errorMessage = 'Unexpected Error'

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.message)
      errorMessage = error.message || error.response.statusText
    } else if (error.request) {
      console.error('No response Error:', error.request.statusText)
      errorMessage = error.request.statusText || 'No response from server'
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
})

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
    )

    if (response.data.status) {
      return response.data.code
    } else {
      throw new Error('Failed to retrieve the authorization code. Please try again.')
    }
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const sendMessage = async (
  idInstance: string | null,
  apiTokenInstance: string | null,
  phoneNumber: string | null,
  message: string
) => {
  try {
    const response = await instanceAxios.post(
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `${phoneNumber}@c.us`,
        message,
      }
    )
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const getMessages = async (idInstance: string | null, apiTokenInstance: string | null) => {
  try {
    const response = await instanceAxios.get(
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    )

    if (!response.data) return null

    const { receiptId, body } = response.data
    if (body?.messageData?.textMessageData?.textMessage) {
      await instanceAxios.delete(
        `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
      )

      return {
        id: receiptId,
        sender: body.senderData.sender,
        content: body.messageData.textMessageData.textMessage,
        timestamp: dayjs(body.timestamp * 1000).format('h:mm A'),
      }
    }

    return null
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const getSettings = async (idInstance: string | null, apiTokenInstance: string | null) => {
  try {
    const response = await instanceAxios.get(
      `/waInstance${idInstance}/getSettings/${apiTokenInstance}`
    )
    return response.data.wid
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}
