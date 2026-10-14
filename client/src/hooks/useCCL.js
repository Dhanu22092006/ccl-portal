import { useState, useEffect } from 'react'
import { errMsg } from '../lib/ccl'
import { getCCLs, getCCL } from '../api/api'

export function useCCLs() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCCLs()
      .then((res) => setData(res.data.data))
      .catch((err) => setError(errMsg(err, 'Unable to load content')))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export function useCCL(slug) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getCCL(slug)
      .then((res) => setData(res.data.data))
      .catch((err) => setError(errMsg(err, 'Unable to load content')))
      .finally(() => setLoading(false))
  }, [slug])

  return { data, loading, error }
}
