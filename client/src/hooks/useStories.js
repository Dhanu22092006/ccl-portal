import { useState, useEffect } from 'react'
import { getStories } from '../api/api'

export function useStories(params = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const paramsStr = JSON.stringify(params)

  useEffect(() => {
    setLoading(true)
    getStories(params)
      .then((res) => setData(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [paramsStr])

  return { data, loading, error }
}
