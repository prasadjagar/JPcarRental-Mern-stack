import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../Context/AppContext';
import { toast } from 'react-hot-toast';

const ManageCars = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios } = useAppContext();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchOwnerCars = async()=>{
    try {
      setLoading(true);
      const {data} = await axios.get('/api/owners/cars');
      if(data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  const toggleAvailability = async(carId) => {
    try {
      const {data} = await axios.get(`/api/owners/toggle-car?carId=${carId}`);
      if(data.success) {
        toast.success('Car availability updated');
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  const deleteCar = async(carId) => {
    try {
      const {data} = await axios.post('/api/owners/delete-car', {carId});
      if(data.success) {
        toast.success('Car deleted successfully');
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  
  useEffect(()=>{
    fetchOwnerCars();
  }, [])
  return (
    <div className="space-y-6">
      <Title title="Manage Cars" subTitle="Add, edit, or remove your cars to keep your listings up-to-date and attract more customers"/>
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="min-w-full border-collapse text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Car</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Category</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Price</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Status</th>
              <th className="px-6 py-4 text-left font-medium uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {cars.map((car, index)=>(
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={car.image} alt={car.name} className="h-14 w-14 rounded-2xl object-cover" />
                    <div>
                      <p className="font-medium text-slate-900">{car.brand} {car.model}</p>
                      <p className="text-xs text-slate-500">{car.seating_capacity} seats · {car.transmission}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-slate-700">{car.category}</td>
                <td className="px-6 py-5 font-medium text-slate-900">{car.pricePerDay}/day</td>
                <td className="px-6 py-5">
                  <span className={car.isAvaliable ? 'inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700' : 'inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700'}>
                    {car.isAvaliable ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="px-6 py-5 space-x-3">
                  <button onClick={() => toggleAvailability(car._id)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200" title={car.isAvaliable ? 'Toggle Off' : 'Toggle On'}>
                    <img src={car.isAvaliable ? assets.eye_icon : assets.eye_close_icon} alt="Toggle visibility" className="h-5 w-5" />
                  </button>
                  <button onClick={() => deleteCar(car._id)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-red-200 hover:text-red-600">
                    <img src={assets.delete_icon} alt="Delete" className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <p className="text-center text-slate-500">Loading cars...</p>}
      {!loading && cars.length === 0 && <p className="text-center text-slate-500">No cars found. Add a car to get started.</p>}
    </div>
  )
}

export default ManageCars