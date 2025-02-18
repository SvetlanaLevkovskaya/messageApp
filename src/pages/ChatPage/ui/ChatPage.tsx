import { useNavigate } from 'react-router-dom'

import { Chat } from '@components/index'

const ChatPage = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <div className="flex flex-col h-screen p-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-rose-500 rounded mb-4 self-end border transition-all hover:opacity-70"
      >
        Logout
      </button>

      <div className="flex flex-col flex-grow overflow-hidden min-w-[504px]">
        <Chat />
      </div>
    </div>
  )
}

export default ChatPage
