
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '@/api/axios'
import { Home } from '@/types/home'
import Loader from '@/components/Loader'
import AmenityPill from '@/components/AmenityPill'
import { formatPrice } from '@/utils/formatPrice'

export default function HomeDetail(){
  const { id } = useParams()
  const [home, setHome] = useState<Home | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Home>(`/homes/${id}`)
        setHome(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const onDelete = async () => {
    if(!confirm('Delete this listing?')) return
    await api.delete(`/homes/${id}`)
    navigate('/')
  }

  if(loading) return <Loader />
  if(!home) return <div>Not found</div>

  return (
    <div className="space-y-6">
      <img src={home.imageUrl} className="w-full h-96 object-cover rounded-2xl" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{home.title}</h1>
          <div className="text-slate-500">{home.location}</div>
          <div className="flex gap-4 text-slate-600 mt-2">
            <span>👤 {home.guests} Guests</span>
            <span>🛏 {home.bedrooms} Bedrooms</span>
            <span>🛁 {home.bathrooms} Bathrooms</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/homes/${home.id}/edit`} className="btn-primary">Edit</Link>
          <button onClick={onDelete} className="btn-primary bg-slate-200 text-slate-800 hover:bg-slate-300">Delete</button>
        </div>
      </div>
      <p className="text-slate-700">{home.description}</p>
      <div>
        <h3 className="font-semibold mb-2">Amenities</h3>
        <div>{home.amenities?.map(a => <AmenityPill key={a} label={a} />)}</div>
      </div>
      <div className="text-2xl font-semibold">{formatPrice(home.pricePerNight)} <span className="text-sm font-normal text-slate-500">/night</span></div>
      <div>
        <button className="btn-primary">Reserve</button>
      </div>
    </div>
  )
}
