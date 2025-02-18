import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex justify-center items-center flex-grow  px-8">
        <div className="flex justify-center items-center flex-col gap-5">
          <h1 className="text-3xl font-medium">Oh, it seems you&#39;re a little lost...</h1>
          <span className="text-2xl font-medium">The page you are looking for does not exist</span>
          <button
            className="px-4 py-2 rounded border transition-all hover:opacity-70 mt-5"
            onClick={() => {
              navigate('/')
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
