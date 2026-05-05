import React from 'react'
import Title from './Title'
import { dummyCarData } from '../assets/assets'
import CartCard from './CartCard'
import { useNavigate } from 'react-router-dom';
import {assets} from '../assets/assets';
import { motion } from 'motion/react';

const FeaturedSection = () => {
    const navigate = useNavigate();
  return (
    <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
        <div className="text-center">
            <Title title="Featured Vehicles" subTitle="Explore our selection of premium vehicles available for your next adventure." />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {
                dummyCarData.slice(0,6).map((car,index)=>(
                    <motion.div
                        key={car._id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                        className="rounded-[2rem] bg-white p-0 shadow-lg shadow-slate-100 ring-1 ring-slate-200"
                    >
                        <CartCard car={car} />
                    </motion.div>
                ))
            }
        </div>
        <div className="mt-12 flex justify-center">
            <motion.button
                onClick={() => {navigate('/cars'); scrollTo(0, 0);}}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 hover:border-slate-400"
            >
                Explore all cars
                <img src={assets.arrow_icon} alt="Arrow" className="h-4 w-4" />
            </motion.button>
        </div>
    </motion.section>
  )
}

export default FeaturedSection
