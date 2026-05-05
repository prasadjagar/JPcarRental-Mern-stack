import React, { useState, useEffect } from 'react'
import Title from '../../components/owner/Title';
import { useAppContext } from '../../Context/AppContext';
import { toast } from 'react-hot-toast';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios } = useAppContext();
  const [loading, setLoading] = useState(false);

  const fetchOwnerBookings = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('/api/bookings/owner');
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
  
  const changeBookingStatus = async (bookingId, newStatus) => {
    try {
      const {data} = await axios.post('/api/bookings/change-status', {
        bookingId,
        status: newStatus
      });
      if(data.success) {
        toast.success('Booking status updated');
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  useEffect(()=>{
    fetchOwnerBookings();
  }, [])
  return (
    <div className="space-y-6">
      <Title title="Manage Bookings" subTitle="Track and manage your vehicle bookings and payments"/>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full border-collapse text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Car</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Date Range</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Total</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Payment</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {bookings.map((booking, index)=>(
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={booking.car.image} alt={booking.car.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-medium text-slate-900">{booking.car.brand} {booking.car.model}</p>
                      <p className="text-xs text-slate-500">{booking.car.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-slate-700">
                  {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-5 font-medium text-slate-900">{currency}{booking.price}</td>
                <td className="px-6 py-5 text-slate-700">
                  <span className="capitalize">{booking.user?.name || 'N/A'}</span>
                </td>
                <td className="px-6 py-5">{booking.status === 'pending' ? (
                  <select 
                    value={booking.status}
                    onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                    className="rounded border border-slate-300 bg-white px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ): (
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{booking.status}</span>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p className="text-center text-slate-500">Loading bookings...</p>}
      {!loading && bookings.length === 0 && <p className="text-center text-slate-500">No bookings found.</p>}
    </div> 
  )
}

export default ManageBookings