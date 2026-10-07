export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-ccl-ocean border-t-transparent animate-spin"></div>
      </div>
      {message && <p className="text-gray-500 font-medium animate-pulse">{message}</p>}
    </div>
  )
}
