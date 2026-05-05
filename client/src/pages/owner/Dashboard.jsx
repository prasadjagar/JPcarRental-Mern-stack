import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [data,setData] =useState({
      totalCars:0,
      totalBookings:0,
      pendingBookings:0,
      completedBookings:0,
      recentBookings:[],
      monthlyRevenue:0,
  })
  const dashboardCards=[
    {title:'Total Cars', value:data.totalCars, icon:assets.carIconColored},
    {title:'Total Bookings', value:data.totalBookings, icon:assets.bookingIconColored},
    {title:'Pending', value:data.pendingBookings, icon:assets.cautionIconColored},
    {title:'Confirmed', value:data.completedBookings, icon:assets.listIconColored},
  ]
  useEffect(() => {
    setData(dummyDashboardData)
  }, [])
  const statusStyles = {
    Confirmed: 'bg-emerald-100 text-emerald-700',
    Completed: 'bg-sky-100 text-sky-700',
    Pending: 'bg-amber-100 text-amber-700',
    Cancelled: 'bg-rose-100 text-rose-700',
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-4 sm:px-6 lg:px-8">
      <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <div key={index} className="flex items-center justify-between rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-slate-500">{card.title}</h2>
              <p className="text-3xl font-semibold text-slate-950">{card.value}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <img src={card.icon} alt={card.title} className="h-8 w-8" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Recent Bookings</h3>
              <p className="mt-1 text-sm text-slate-500">Latest customer bookings</p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">4 items</span>
          </div>

          <div className="space-y-4">
            {data.recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <img src={assets.listIconColored} alt="Recent booking" className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{booking.car.brand} {booking.car.model}</p>
                    <p className="text-xs text-slate-500">{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-semibold text-slate-950">{currency}{booking.price}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status] || 'bg-slate-100 text-slate-700'}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-sm ring-1 ring-slate-900/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Monthly Revenue</p>
              <h3 className="mt-4 text-4xl font-semibold">{currency}{data.monthlyRevenue}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800">
              <img src={assets.carIconColored} alt="Revenue" className="h-7 w-7" />
            </div>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-400">Revenue for current month based on confirmed bookings and completed rentals.</p>
        </section>
      </div>
    </div>
  )
}

export default Dashboard