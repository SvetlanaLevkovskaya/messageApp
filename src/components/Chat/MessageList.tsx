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
      {messages.map((msg) => (
        <div key={msg.id} className={`mb-2 ${msg.sender === wid ? 'text-right' : 'text-left'}`}>
          <p className="inline-block p-2 rounded shadow max-w-[500px] break-words bg-white">
            {msg.content}
          </p>
        </div>
      ))}
    </div>
  )
}
