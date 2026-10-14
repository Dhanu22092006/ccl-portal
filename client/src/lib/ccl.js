export const STATUS = {
  active: { label: 'Active', dot: 'bg-moss' },
  'coming-soon': { label: 'Content being added', dot: 'bg-clay' },
  placeholder: { label: 'Draft · being documented', dot: 'bg-ink-mute' },
}
export const statusMeta = (s) => STATUS[s] || STATUS['coming-soon']
export const errMsg = (e, fallback = 'Something went wrong') => e?.response?.data?.message || e?.message || fallback
export const place = (c) => [c?.location?.city, c?.location?.state].filter(Boolean).join(', ')
export const visibleSubs = (item) => (item?.subItems || []).filter((s) => s.isPublic !== false && s.slug)
