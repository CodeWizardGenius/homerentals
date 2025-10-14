
import { Link } from 'react-router-dom'
import { Home } from '@/types/home'
import { formatPrice } from '@/utils/formatPrice'

export default function HomeCard({home}:{home: Home}){
  return (
    <Link to={`/homes/${home.id}`} className="block card hover:shadow-lg transition">
      <img src={home.imageUrl} alt={home.title} className="h-48 w-full object-cover rounded-xl" />
      <div className="pt-3">
        <div className="font-semibold">{home.title}</div>
        <div className="text-sm text-slate-500">{home.location}</div>
        <div className="flex gap-3 text-sm text-slate-600 mt-2">
          <span>👤 {home.guests} guests</span>
          <span>🛏 {home.bedrooms} bed</span>
          <span>🛁 {home.bathrooms} bath</span>
        </div>
        <div className="mt-3 font-semibold">{formatPrice(home.pricePerNight)} <span className="text-sm font-normal text-slate-500">/night</span></div>
      </div>
    </Link>
  )
}
