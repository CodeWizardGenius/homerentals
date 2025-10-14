
import { useEffect, useMemo, useState } from 'react'
import { api } from '@/api/axios'
import { Home } from '@/types/home'
import HomeCard from '@/components/HomeCard'
import Loader from '@/components/Loader'

export default function HomeList(){
  const [homes, setHomes] = useState<Home[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Home[]>('/homes')
        setHomes(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if(!s) return homes
    return homes.filter(h => [h.title, h.location].some(v => v.toLowerCase().includes(s)))
  }, [q, homes])

  if(loading) return <Loader />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Explore Homes</h1>
          <p className="text-slate-500">Find your perfect stay</p>
        </div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title or location..." className="border rounded-xl px-3 py-2 w-72" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(h => <HomeCard key={h.id} home={h} />)}
      </div>
    </div>
  )
}
