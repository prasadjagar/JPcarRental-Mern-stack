import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import { useAppContext } from '../Context/AppContext';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, user } = useAppContext();

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('/api/bookings/user');
      if(data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  }

  useEffect(() => {
    if(user) {
      fetchMyBookings();
    }
  }, [user])

  if(loading) return <Loader />

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <Title 
          title="My Bookings" 
          subTitle="View and manage your car rental bookings"
        />
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <img src={assets.car_icon} alt="No bookings" className="mx-auto mb-4 h-16 w-16 opacity-30" />
          <p className="text-lg font-semibold text-slate-600">No bookings yet</p>
          <p className="mt-2 text-slate-500">Start your next adventure by booking a car</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div key={booking._id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg">
              <div className="grid gap-6 p-6 sm:grid-cols-5 sm:gap-8 sm:p-8">
                {/* Car Image */}
                <div className="sm:col-span-1">
                  <img 
                    src={booking.car.image} 
                    alt={booking.car.name} 
                    className="h-48 w-full rounded-2xl object-cover sm:h-32 sm:w-full"
                  />
                </div>

                {/* Car Info */}
                <div className="sm:col-span-2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 sm:text-lg">
                      {booking.car.brand} {booking.car.model}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {booking.car.year} • {booking.car.category} • {booking.car.location}
                    </p>
                  </div>

                  {/* Booking Number and Status */}
                  <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-2">
                    <p className="text-sm font-medium text-slate-700">
                      Booking #{index + 1}
                    </p>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="sm:col-span-1 space-y-4 sm:space-y-3">
                  {/* Rental Period */}
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-start gap-2">
                      <img src={assets.calendar_icon_colored} alt="Calendar" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-600">Rental Period</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex items-start gap-2">
                      <img src={assets.location_icon_colored} alt="Location" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-600">Pickup</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {booking.car.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Price and Booking Date */}
                <div className="sm:col-span-1 flex flex-col justify-between rounded-2xl bg-blue-50 p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Price</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-2xl">
                      {currency}{booking.price}
                    </h2>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-slate-600">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider - Mobile Only */}
              <div className="border-t border-slate-200 sm:hidden"></div>

              {/* Footer Info - Mobile Only */}
              <div className="grid grid-cols-2 gap-4 p-6 sm:hidden">
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-600">Days</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {Math.ceil((new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-600">Per Day</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {currency}{booking.car.pricePerDay}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Section - Desktop */}
      {bookings.length > 0 && (
        <div className="mt-12 hidden grid-cols-3 gap-6 sm:grid">
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 ring-1 ring-blue-200">
            <p className="text-sm font-medium text-blue-700">Total Bookings</p>
            <p className="mt-2 text-3xl font-bold text-blue-900">{bookings.length}</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 ring-1 ring-emerald-200">
            <p className="text-sm font-medium text-emerald-700">Total Spent</p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">
              {currency}{bookings.reduce((acc, b) => acc + b.price, 0)}
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 ring-1 ring-purple-200">
            <p className="text-sm font-medium text-purple-700">Confirmed</p>
            <p className="mt-2 text-3xl font-bold text-purple-900">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings