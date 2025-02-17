import axios from 'axios'


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
});


instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

const idInstance = localStorage.getItem('idInstance')
const apiTokenInstance = localStorage.getItem('apiTokenInstance')

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

export const sendMessage = async (phoneNumber: string, message: string) => {
  try {
    const response = await instanceAxios.post(
      `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: `${phoneNumber}@c.us`,
        message,
      }
    )

    console.log('response.data sendMessage', response.data)

    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const getMessages = async () => {
  try {
    const response = await instanceAxios.get(
      `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    )

    console.log('response', response)

    if (!response.data) return null

    const { receiptId, body } = response.data
    console.log('response receiptId', receiptId)
    console.log('response body', body)
    if (body?.messageData?.textMessageData?.textMessage) {
        await instanceAxios.delete(
        `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
      )
      console.log('response.data', response.data)
      console.log('response.return', {
        id: receiptId,
        sender: body.senderData.chatId,
        content: body.messageData.textMessageData.textMessage,
      })

      return {
        id: receiptId,
        sender: body.senderData.chatId ?? body.senderData.sender,
        content: body.messageData.textMessageData.textMessage,
      }
    }

    return null
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}


export const getSettings = async () => {
  try {
    const response = await instanceAxios.get(
      `/waInstance${idInstance}/getSettings/${apiTokenInstance}`
    );
    console.log('response getSettings', response);
    return response.data.wid;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
