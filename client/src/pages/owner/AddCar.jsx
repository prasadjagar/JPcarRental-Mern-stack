import React, { useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../Context/AppContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login first');
      return;
    }

    if (!image) {
      toast.error('Please upload a car image');
      return;
    }

    if (!car.brand || !car.model || !car.year || !car.pricePerDay || !car.category || !car.transmission || !car.fuel_type || !car.seating_capacity || !car.location) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('carData', JSON.stringify(car));
      formData.append('image', image);

      const {data} = await axios.post('/api/owners/add-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        toast.success('Car added successfully');
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        });
        setImage(null);
        navigate('/owner/manage-cars');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Error adding car:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = 'rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200';
  const selectClasses = 'rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200';

  return (
    <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <Title title="Add New Car" subTitle="Provide details about the car you want to list for rent" />

      <form onSubmit={onSubmitHandler} className="space-y-8">
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400">
          <label htmlFor="car-image" className="mx-auto flex max-w-sm cursor-pointer flex-col items-center justify-center gap-4">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Upload car"
              className="h-24 w-24 rounded-3xl object-cover"
            />
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900">Upload a picture of your car</p>
              <p className="text-sm text-slate-500">PNG, JPG or JPEG. Max file size 5MB.</p>
            </div>
          </label>
          <input type="file" id="car-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes"
              value={car.brand}
              onChange={e => setCar({ ...car, brand: e.target.value })}
              className={inputClasses}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class"
              value={car.model}
              onChange={e => setCar({ ...car, model: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Year</label>
            <input
              type="number"
              placeholder="2025"
              value={car.year}
              onChange={e => setCar({ ...car, year: e.target.value ? Number(e.target.value) : '' })}
              className={inputClasses}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Daily Price ($)</label>
            <input
              type="number"
              placeholder="100"
              value={car.pricePerDay}
              onChange={e => setCar({ ...car, pricePerDay: e.target.value ? Number(e.target.value) : '' })}
              className={inputClasses}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Category</label>
            <select
              name="category"
              value={car.category}
              onChange={e => setCar({ ...car, category: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select Category</option>
              <option value="Economy">Economy</option>
              <option value="Compact">Compact</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Transmission</label>
            <select
              name="transmission"
              value={car.transmission}
              onChange={e => setCar({ ...car, transmission: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Fuel Type</label>
            <select
              name="fuel_type"
              value={car.fuel_type}
              onChange={e => setCar({ ...car, fuel_type: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Seating Capacity</label>
            <input
              type="number"
              placeholder="5"
              value={car.seating_capacity}
              onChange={e => setCar({ ...car, seating_capacity: e.target.value ? Number(e.target.value) : '' })}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Location</label>
            <select
              name="location"
              value={car.location}
              onChange={e => setCar({ ...car, location: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-600">Description</label>
            <textarea
              rows={5}
              placeholder="Describe your car, its condition, and any notable details."
              value={car.description}
              onChange={e => setCar({ ...car, description: e.target.value })}
              className="min-h-[140px] rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img src={assets.tick_icon} alt="Submit" className="h-4 w-4" />
            {loading ? 'Listing...' : 'List Your Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;

          