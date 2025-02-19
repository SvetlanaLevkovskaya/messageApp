import { Check } from '@components/Chat/Check.tsx'
import { Message } from '@type/index'

interface Props {
  messages: Message[]
  wid: string | null
}

export const MessageList = ({ messages, wid }: Props) => {
  return (
    <div
      className="flex-1 p-4 overflow-y-auto border border-gray-200"
      style={{
        backgroundImage: 'url("/whatsapp-img.webp")',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
      }}
    >
      {messages.map((msg) => {
        return (
          <div key={msg.id} className={`mb-2 ${msg.sender === wid ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block p-2 rounded shadow max-w-[500px] break-words bg-white ${
                msg.sender === wid ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <p>{msg.content}</p>
              <div className="flex justify-end items-center gap-1">
                <span
                  className={`block text-sm text-gray-500 ${
                    msg.sender === wid ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.timestamp}
                </span>
                {msg.sender === wid && <Check />}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
