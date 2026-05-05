import React from 'react'
import { motion } from 'motion/react'

const NewsLetter = () => {
  return (
    <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-4"
        >
            <h1 className="md:text-4xl text-2xl font-bold text-slate-900">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500 pb-4">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    className="border border-gray-300 rounded-l-md h-full border-r-0 outline-none w-full px-4 text-gray-700 placeholder:text-gray-400"
                    type="email"
                    placeholder="Enter your email id"
                    required
                />
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="md:px-8 px-6 h-full text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer rounded-r-md font-semibold"
                >
                    Subscribe
                </motion.button>
            </form>
        </motion.div>
  )
}

export default NewsLetter
