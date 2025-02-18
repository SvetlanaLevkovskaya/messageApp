import { Message } from '@type/index'

interface Props {
  messages: Message[]
  wid: string | null
}

export const MessageList = ({ messages, wid }: Props) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
      {messages.map((msg) => (
        <div key={msg.id} className={`mb-2 ${msg.sender === wid ? 'text-right' : 'text-left'}`}>
          <p className="inline-block bg-white p-2 rounded shadow max-w-[500px] break-words">
            {msg.content}
          </p>
        </div>
      ))}
    </div>
  )
}
