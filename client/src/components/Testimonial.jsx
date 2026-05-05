import React from 'react'
import Title from './Title';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Testimonial = () => {
     const testimonials = [
        { name: "Emma Rodriguez", location: "Barcelona, Spain", image: assets.testimonial_image_1, testimonial: "\"I've rented cars from various companies, but the experience with CarRental was exceptional.\"" },
        { name: "John Smith", location: "New York, USA", image: assets.testimonial_image_2, testimonial: "\"CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!\"" },
        { name: "Ava Johnson", location: "Sydney, Australia", image: assets.testimonial_image_1, testimonial: "\"I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.\"" }
    ];
  return (
     <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
     >
        <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."/>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                        className="bg-white p-6 rounded-xl shadow max-w-xs"
                    >
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-semibold text-sm text-slate-900">{testimonial.name}</p>
                                <p className="text-xs text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="Star" className="h-4 w-4" />
                            ))}
                        </div>
                        <p className="text-gray-500 text-sm max-w-90 mt-4">{testimonial.testimonial}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
  
}

export default Testimonial
