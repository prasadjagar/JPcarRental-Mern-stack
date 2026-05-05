import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const CartCard = ({car}) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {navigate(`/car-details/${car._id}`); scrollTo(0, 0)}}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group cursor-pointer overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg transition hover:shadow-2xl"
    >
      <div className="relative">
        <motion.img
          src={car.image}
          alt={car.name}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="h-64 w-full object-cover"
        />

        {car.isAvailable && (
          <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg">
            Available Now
          </span>
        )}

        <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-lg">
          {currency}{car.pricePerDay}
          <span className="ml-1 text-xs font-medium text-slate-300">/day</span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{car.brand} {car.model}</h3>
          <p className="mt-1 text-sm text-slate-500">{car.category} {car.year}</p>
        </div>

        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="Seats" className="h-4 w-4" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="Fuel" className="h-4 w-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.car_icon} alt="Transmission" className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="Location" className="h-4 w-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartCard
