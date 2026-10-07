import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

function useCountUp(target, duration = 1500, inView) {
  const [count, setCount] = useState(0)
  const numericTarget = parseInt(target.toString().replace(/[^0-9]/g, ''), 10)

  useEffect(() => {
    if (!inView || !numericTarget) return
    let start = 0
    const increment = numericTarget / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, numericTarget, duration])

  // Format number with commas
  const hasComma = target.toString().includes(',')
  const formatted = hasComma ? count.toLocaleString('en-IN') : count.toString()
  const prefix = target.toString().match(/^[^0-9]*/)?.[0] || ''
  const suffix = target.toString().replace(/[0-9,+]/g, '') || ''

  return `${prefix}${formatted}${suffix}`
}

export default function StatCard({ label, value, unit, icon, color = '#0B4F6C' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const displayValue = useCountUp(value, 1500, inView)

  const iconMap = {
    clock: 'fa-clock',
    users: 'fa-users',
    fish: 'fa-fish',
    chart: 'fa-chart-bar',
    building: 'fa-building',
    tag: 'fa-tag',
    leaf: 'fa-leaf',
    home: 'fa-home',
    stone: 'fa-landmark',
    recycle: 'fa-recycle',
    book: 'fa-book',
  }

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-md card-hover text-center border border-gray-100"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl"
        style={{ backgroundColor: color }}
      >
        <i className={`fas ${iconMap[icon] || 'fa-star'}`}></i>
      </div>
      <div className="text-3xl font-bold font-heading mb-1" style={{ color }}>
        {inView ? displayValue : '0'}
      </div>
      {unit && <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{unit}</div>}
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  )
}
