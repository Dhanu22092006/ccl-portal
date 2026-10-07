const variants = {
  success: 'bg-green-100 text-green-800 border border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border border-blue-200',
  danger: 'bg-red-100 text-red-800 border border-red-200',
  neutral: 'bg-gray-100 text-gray-800 border border-gray-200',
  active: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  'coming-soon': 'bg-amber-100 text-amber-800 border border-amber-200',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`badge ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  )
}
