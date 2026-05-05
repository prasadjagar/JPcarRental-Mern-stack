import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
        <NavbarOwner/>
        <div className="flex min-h-[calc(100vh-72px)]">
            <Sidebar/>
            <main className="flex-1 p-6 sm:p-8">
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default Layout