import Footer from '@/components/ui/footer'
import Navbar from '@/components/ui/nav-bar'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
              <Navbar />
              {children}
            </div>
          </div>
          <Footer />
    </>
  )
}

export default Layout
