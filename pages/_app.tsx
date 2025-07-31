// pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const hideNavbarOn = ['/login', '/register']
  const shouldHideNavbar = hideNavbarOn.includes(router.pathname)

  // ✅ Update token status on route change
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token')
      setIsLoggedIn(!!token)
    }

    checkToken() // initial
    router.events.on('routeChangeComplete', checkToken)

    return () => {
      router.events.off('routeChangeComplete', checkToken)
    }
  }, [router.events])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {!shouldHideNavbar && (
        <nav className="bg-blue-600 text-white px-6 py-3 flex items-center space-x-6 shadow">
          <Link href="/appointments" className="hover:underline">Appointments</Link>
          <Link href="/appointments/book" className="hover:underline">Book</Link>
<Link href="/queue" className="hover:underline">Queue</Link>  
 <Link href="/doctors" className="hover:underline">Doctors</Link>
 
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="ml-auto bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-auto border border-white text-white hover:bg-white hover:text-blue-600 px-3 py-1 rounded transition"
            >
              Login
            </Link>
          )}
        </nav>
      )}

      <main className="p-6">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
