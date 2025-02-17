import { KeyboardEvent, useEffect, useState } from 'react'
import { getMessages, getSettings, sendMessage } from '../services/clientApi.ts'
import { LuSendHorizontal } from 'react-icons/lu'

interface Message {
  id: string
  sender: string
  content: string
}

export const Chat = () => {
  const phoneNumber = localStorage.getItem('phoneNumber') || ''
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    return savedMessages ? JSON.parse(savedMessages) : []
  })
  const [inputMessage, setInputMessage] = useState('')
  const [wid, setWid] = useState<string | null>(null)

  useEffect(() => {
    const fetchWid = async () => {
      try {
        const settings = await getSettings()
        setWid(settings)
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }

    fetchWid()
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const newMessage = await getMessages()
        if (!newMessage) return
        console.log('newMessage', newMessage)
        setMessages((prev) => {
          if (prev.some((msg) => msg.id === newMessage.id)) return prev

          const updatedMessages = [...prev, newMessage]
          localStorage.setItem('chatMessages', JSON.stringify(updatedMessages))
          return updatedMessages
        })
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return
    try {
      const wid = await getSettings()
      await sendMessage(phoneNumber, inputMessage)
      setMessages([...messages, { id: Date.now().toString(), sender: wid, content: inputMessage }])
      setInputMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputMessage.trim()) {
      handleSendMessage()
    }
  }

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender === wid ? 'text-right' : 'text-left'}`}>
            <p className="inline-block bg-white p-2 rounded shadow max-w-[500px] break-words">
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center px-3.5 py-0.5 border-t border-gray-200 bg-gray-100">
        <input
          type="text"
          value={inputMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 border-none outline-none p-[10px] bg-gray-100"
          placeholder="Start typing..."
        />

        <div className="flex items-center gap-4">
          <div
            className={`text-gray-400 transition-colors duration-300 ease-in-out cursor-pointer hover:text-blue-500 ${inputMessage ? 'text-blue-600' : ''}`}
            onClick={handleSendMessage}
          >
            <LuSendHorizontal />
          </div>
        </div>
      </div>
    </>
  )
}
