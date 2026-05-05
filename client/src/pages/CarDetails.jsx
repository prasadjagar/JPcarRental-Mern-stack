import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../Context/AppContext';
import { toast } from 'react-hot-toast';
import { motion } from 'motion/react';

const CarDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {axios, user, setShowLogin, pickupDate, returnDate, cars, carsLoading} = useAppContext();
    const [car, setCar] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [localPickupDate, setLocalPickupDate] = useState(pickupDate);
    const [localReturnDate, setLocalReturnDate] = useState(returnDate);
    const currency = import.meta.env.VITE_CURRENCY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            setShowLogin(true);
            return;
        }

        if (!localPickupDate || !localReturnDate) {
            toast.error('Please select pickup and return dates');
            return;
        }

        try {
            setLoading(true);
            const {data} = await axios.post('/api/bookings/create', {
                car: car._id,
                pickupDate: localPickupDate,
                returnDate: localReturnDate
            });

            if (data.success) {
                toast.success('Car booked successfully');
                navigate('/my-bookings');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const carList = [...cars, ...dummyCarData];
        const selectedCar = carList.find(car => car._id === id);

        if (selectedCar) {
            setCar(selectedCar);
            return;
        }

        setCar(carsLoading ? undefined : null);
    }, [cars, carsLoading, id])

    if (car === undefined) {
        return <Loader />
    }

    if (car === null) {
        return (
            <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-slate-900">Car not found</h1>
                <p className="mt-3 text-slate-600">
                    This car may have been removed or is no longer available.
                </p>
                <button
                    type="button"
                    onClick={() => navigate('/cars')}
                    className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    Back to cars
                </button>
            </div>
        )
    }

    return (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-slate-600 transition hover:text-slate-900"
        >
            <img src={assets.arrow_icon} alt="Back" className="h-5 w-5 rotate-180" />
            Back to all cars
        </button>

        <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
                {/* Main Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                    className="overflow-hidden rounded-3xl bg-slate-100 shadow-lg"
                >
                    <motion.img
                        src={car.image}
                        alt={car.name}
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="h-96 w-full object-cover"
                    />
                </motion.div>

                {/* Car Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
                    className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 space-y-6"
                >
                    {/* Title Section */}
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">{car.brand} {car.model}</h1>
                        <p className="mt-2 text-lg text-slate-600">{car.category} • {car.year}</p>
                    </div>

                    <hr className="border-slate-200" />

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                            {icon: assets.users_icon, text:`${car.seating_capacity} Seats`},
                            {icon: assets.fuel_icon, text: car.fuel_type},
                            {icon: assets.car_icon, text: car.transmission},
                            {icon: assets.location_icon, text: car.location},
                        ].map(({icon, text}) => (
                            <div key={text} className="flex flex-col items-center gap-2 rounded-2xl bg-slate-50 p-4">
                                <img src={icon} alt={text} className="h-6 w-6" />
                                <span className="text-sm font-medium text-slate-900 text-center">{text}</span>
                            </div>  
                        ))}
                    </div>

                    <hr className="border-slate-200" />

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-3">Description</h2>
                        <p className="text-slate-600 leading-relaxed">{car.description || 'Premium quality vehicle in excellent condition. Well-maintained and ready for your adventure.'}</p>
                    </div>

                    {/* Features */}
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Key Features</h2>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {[
                                "360° View",
                                "GPS Navigation",
                                "Bluetooth Connectivity",
                                "Heated Seats",
                                "Climate Control",
                                "Backup Camera"
                            ].map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <img src={assets.check_icon} alt="Check" className="h-5 w-5" />
                                    <span className="text-slate-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
                    className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sticky top-24 space-y-6"
                >
                    {/* Price Section */}
                    <div className="text-center">
                        <div className="text-5xl font-bold text-slate-900">{currency}{car.pricePerDay}</div>
                        <p className="mt-2 text-slate-600">Per day</p>
                    </div>

                    <hr className="border-slate-200" />

                    {/* Date Inputs */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="pickupDate" className="block text-sm font-medium text-slate-700 mb-2">
                                Pick-up Date
                            </label>
                            <input 
                                type="date" 
                                id="pickupDate" 
                                required 
                                value={localPickupDate}
                                onChange={(e) => setLocalPickupDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label htmlFor="returnDate" className="block text-sm font-medium text-slate-700 mb-2">
                                Return Date
                            </label>
                            <input 
                                type="date" 
                                id="returnDate" 
                                required 
                                value={localReturnDate}
                                onChange={(e) => setLocalReturnDate(e.target.value)}
                                min={localPickupDate || new Date().toISOString().split('T')[0]}
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Book Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.97 }}
                        className="w-full rounded-2xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Booking...' : 'Book Now'}
                    </motion.button>

                    {/* Info Text */}
                    <p className="text-center text-sm text-slate-600">
                        ✓ No credit card required to reserve
                    </p>

                    {/* Additional Info */}
                    <div className="space-y-2 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">What's included:</p>
                        <ul className="space-y-1 text-xs">
                            <li>✓ Driver verification</li>
                            <li>✓ Insurance coverage</li>
                            <li>✓ 24/7 roadside support</li>
                        </ul>
                    </div>
                </motion.form>
            </div>
        </div>
    </motion.div>
  )
}

export default CarDetails
