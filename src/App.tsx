
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl">HomeRentals</Link>
          <nav className="flex items-center gap-4">
            <NavLink to="/" className={({isActive}) => isActive ? 'text-rose-600 font-medium' : 'text-slate-600'}>Explore</NavLink>
            <Link to="/homes/new" className="btn-primary">+ Add Home</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-slate-500 py-10">© {new Date().getFullYear()} HomeRentals</footer>
    </div>
  )
}
