
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '@/api/axios'
import { Home } from '@/types/home'

type Props = { mode: 'create' | 'edit' }

const empty: Home = {
  title: '',
  description: '',
  pricePerNight: 0,
  location: '',
  imageUrl: '',
  guests: 1,
  bedrooms: 1,
  bathrooms: 1,
  amenities: []
}

export default function HomeForm({mode}: Props){
  const { id } = useParams()
  const [model, setModel] = useState<Home>(empty)
  const [amenities, setAmenities] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if(mode === 'edit' && id){
      api.get<Home>(`/homes/${id}`).then(({data}) => {
        setModel(data)
        setAmenities(data.amenities?.join(', ') || '')
      })
    }
  }, [mode, id])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const payload: Home = { ...model, amenities: amenities.split(',').map(s => s.trim()).filter(Boolean) }
    if(mode === 'create'){
      await api.post('/homes', payload)
    }else{
      await api.put(`/homes/${id}`, payload)
    }
    navigate('/')
  }

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto card space-y-4">
      <h1 className="text-2xl font-bold">{mode==='create' ? 'Add New Home' : 'Edit Home'}</h1>
      <div className="grid gap-4">
        <label className="grid">
          <span className="text-sm text-slate-600 mb-1">Title *</span>
          <input required value={model.title} onChange={e=>setModel({...model, title:e.target.value})} className="border rounded-xl px-3 py-2" />
        </label>
        <label className="grid">
          <span className="text-sm text-slate-600 mb-1">Description *</span>
          <textarea required value={model.description} onChange={e=>setModel({...model, description:e.target.value})} className="border rounded-xl px-3 py-2 h-28" />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="grid">
            <span className="text-sm text-slate-600 mb-1">Price per night ($) *</span>
            <input type="number" min={0} required value={model.pricePerNight} onChange={e=>setModel({...model, pricePerNight:Number(e.target.value)})} className="border rounded-xl px-3 py-2" />
          </label>
          <label className="grid">
            <span className="text-sm text-slate-600 mb-1">Location *</span>
            <input required value={model.location} onChange={e=>setModel({...model, location:e.target.value})} className="border rounded-xl px-3 py-2" />
          </label>
        </div>
        <label className="grid">
          <span className="text-sm text-slate-600 mb-1">Image URL</span>
          <input value={model.imageUrl} onChange={e=>setModel({...model, imageUrl:e.target.value})} className="border rounded-xl px-3 py-2" />
        </label>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="grid">
            <span className="text-sm text-slate-600 mb-1">Guests *</span>
            <input type="number" min={1} required value={model.guests} onChange={e=>setModel({...model, guests:Number(e.target.value)})} className="border rounded-xl px-3 py-2" />
          </label>
          <label className="grid">
            <span className="text-sm text-slate-600 mb-1">Bedrooms *</span>
            <input type="number" min={0} required value={model.bedrooms} onChange={e=>setModel({...model, bedrooms:Number(e.target.value)})} className="border rounded-xl px-3 py-2" />
          </label>
          <label className="grid">
            <span className="text-sm text-slate-600 mb-1">Bathrooms *</span>
            <input type="number" min={0} required value={model.bathrooms} onChange={e=>setModel({...model, bathrooms:Number(e.target.value)})} className="border rounded-xl px-3 py-2" />
          </label>
        </div>
        <label className="grid">
          <span className="text-sm text-slate-600 mb-1">Amenities (comma-separated)</span>
          <input value={amenities} onChange={e=>setAmenities(e.target.value)} className="border rounded-xl px-3 py-2" />
        </label>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-primary">{mode==='create' ? 'Create Home' : 'Save Changes'}</button>
        <button type="button" onClick={()=>navigate(-1)} className="btn-primary bg-slate-200 text-slate-800 hover:bg-slate-300">Cancel</button>
      </div>
    </form>
  )
}
