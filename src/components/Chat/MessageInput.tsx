import { ChangeEvent, KeyboardEvent } from 'react'
import { LuSendHorizontal } from 'react-icons/lu'

interface Props {
  inputMessage: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSendMessage: () => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const MessageInput = ({ inputMessage, onInputChange, onSendMessage, onKeyDown }: Props) => {
  return (
    <div className="flex items-center px-3.5 py-0.5 border-b border-r border-l border-gray-200 bg-white">
      <input
        type="text"
        value={inputMessage}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        className="flex-1 border-none outline-none p-[10px] "
        placeholder="Start typing..."
      />
      <div className="flex items-center gap-4">
        <div
          className={`text-gray-400 transition-colors duration-300 ease-in-out cursor-pointer hover:text-blue-600 ${inputMessage ? '!text-blue-600' : ''}`}
          onClick={onSendMessage}
        >
          <LuSendHorizontal />
        </div>
      </div>
    </div>
  )
}
