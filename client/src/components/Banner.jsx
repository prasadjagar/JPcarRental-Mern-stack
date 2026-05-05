import React from 'react'
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import { motion } from 'motion/react';

const Banner = () => {
  const navigate = useNavigate();
  const { user, setShowLogin } = useAppContext();

  const handleListCar = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      navigate('/owner/add-car');
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mx-auto w-full max-w-6xl rounded-[2rem] border border-blue-300/40 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 p-6 shadow-2xl shadow-slate-900/10 sm:p-8"
    >
      <div className="flex flex-col items-start gap-8 rounded-[1.75rem] bg-white/10 p-6 text-left backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:p-8">
        <div className="max-w-xl text-white sm:max-w-lg">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Do You Own a Luxury Car?</h2>
          <p className="mt-4 max-w-xl text-sm text-white/90 sm:text-base">Monetize your vehicle effortlessly by listing it on CarRental. We take care of insurance, driver verification, and secure payments so you can earn passive income, stress-free.</p>
          <motion.button
            onClick={handleListCar}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:bg-slate-100"
          >
            List your car
          </motion.button>
        </div>
        <motion.div
          initial={{ x: 28, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative w-full max-w-[28rem] overflow-hidden rounded-[2rem] bg-slate-900/5 p-4 ring-1 ring-white/20 sm:p-6"
        >
          <motion.img
            src={assets.banner_car_image}
            alt="Banner"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-auto w-full object-contain"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Banner
