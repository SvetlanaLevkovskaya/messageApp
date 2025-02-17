import { KeyboardEvent, useCallback, useEffect, useReducer } from 'react'
import { getMessages, getSettings, sendMessage } from '../services/clientApi.ts'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { Message } from '../types'
import { useAuthData } from '../hooks/useAuthData.ts'

interface ChatState {
  messages: Message[]
  wid: string | null
  inputMessage: string
}

const initialState: ChatState = {
  messages: JSON.parse(localStorage.getItem('chatMessages') || '[]'),
  wid: null,
  inputMessage: '',
}

type ChatAction =
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SET_WID'; payload: string | null }
  | { type: 'SET_INPUT_MESSAGE'; payload: string }
  | { type: 'CLEAR_INPUT_MESSAGE' }

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload }
    case 'SET_WID':
      return { ...state, wid: action.payload }
    case 'SET_INPUT_MESSAGE':
      return { ...state, inputMessage: action.payload }
    case 'CLEAR_INPUT_MESSAGE':
      return { ...state, inputMessage: '' }
    default:
      return state
  }
}

export const Chat = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const { idInstance, apiTokenInstance, phoneNumber } = useAuthData()

  const { messages, inputMessage, wid } = state

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return
    const fetchWid = async () => {
      try {
        const settings = await getSettings(idInstance, apiTokenInstance)
        dispatch({ type: 'SET_WID', payload: settings })
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }

    fetchWid()
  }, [idInstance, apiTokenInstance])

  useEffect(() => {
    if (!idInstance || !apiTokenInstance) return
    const fetchMessages = async () => {
      try {
        const newMessage = await getMessages(idInstance, apiTokenInstance)
        if (newMessage) {
          dispatch({
            type: 'SET_MESSAGES',
            payload: [...messages, newMessage],
          })
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [messages, idInstance, apiTokenInstance])

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return
    try {
      const wid = await getSettings(idInstance, apiTokenInstance)
      await sendMessage(idInstance, apiTokenInstance, phoneNumber, inputMessage)
      dispatch({
        type: 'SET_MESSAGES',
        payload: [...messages, { id: Date.now().toString(), sender: wid, content: inputMessage }],
      })
      dispatch({ type: 'CLEAR_INPUT_MESSAGE' })
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }, [inputMessage, messages, phoneNumber])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      handleSendMessage()
    }
  }

  return (
    <>
      <MessageList messages={messages} wid={wid} />
      <MessageInput
        inputMessage={inputMessage}
        onInputChange={(e) => dispatch({ type: 'SET_INPUT_MESSAGE', payload: e.target.value })}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}
