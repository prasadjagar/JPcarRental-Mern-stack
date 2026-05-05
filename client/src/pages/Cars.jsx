import React, { useState } from 'react'
import Title from '../components/Title';
import { assets, dummyCarData } from '../assets/assets';
import CartCard from '../components/CartCard';
import { useAppContext } from '../Context/AppContext';
import { motion } from 'motion/react';

const Cars = () => {
    const { cars, pickupLocation } = useAppContext();
    const [input, setInput] = useState(pickupLocation || "");
    const carList = cars.length ? cars : dummyCarData;
    const searchTerm = input.trim().toLowerCase();
    const filteredCars = carList.filter((car) => {
      if (!searchTerm) return true;

      return [car.brand, car.model, car.category, car.location]
        .some((value) => value?.toLowerCase().includes(searchTerm));
    });

  return (
    <motion.main
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="space-y-10">
        <div className="space-y-6 text-center md:text-left">
          <Title title="Available Cars" subTitle="Browse our selection of premium vehicles available for your next adventure." />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
            className="mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5 lg:mx-0"
          >
            <img src={assets.search_icon} alt="search" className="h-4 w-4 text-slate-400" />
            <input
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search by brand, model, or location"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-10 items-center justify-center rounded-full bg-slate-100 px-4 text-slate-600 transition hover:bg-slate-200"
            >
              <img src={assets.filter_icon} alt="filter" className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
          className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">Showing {filteredCars.length} cars</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car,index)=>(
              <motion.div
                key={car._id || index}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              >
                <CartCard car={car}/>
              </motion.div>
            ))}
          </div>
          {filteredCars.length === 0 && (
            <p className="py-10 text-center text-sm font-medium text-slate-500">
              No cars found for your search.
            </p>
          )}
        </motion.div>
      </div>
    </motion.main>
  )
}

export default Cars
