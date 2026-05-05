import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import { motion } from 'motion/react';

const Hero = () => {
    const {
      navigate,
      pickupLocation,
      setPickupLocation,
      pickupDate,
      setPickupDate,
      returnDate,
      setReturnDate,
    } = useAppContext();

    const handleSearch = (e) => {
      e.preventDefault();
      navigate('/cars');
    };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col items-center gap-10 text-center">
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          Luxury Cars on Rent
        </motion.h1>

        <motion.form
          onSubmit={handleSearch}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          <div className="grid gap-4 rounded-full border border-slate-200 bg-white px-4 py-4 shadow-sm sm:grid-cols-[1.7fr_1fr_1fr_auto]">
            <div className="flex flex-col">
              <label htmlFor="pickup-location" className="mb-2 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Pickup Location</label>
              <select
                id="pickup-location"
                required
                value={pickupLocation}
                onChange={(e)=>setPickupLocation(e.target.value)}
                className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="">Select Location</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="pickup-date" className="mb-2 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Pickup Date</label>
              <input
                id="pickup-date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                required
                value={pickupDate}
                onChange={(e)=>setPickupDate(e.target.value)}
                className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="return-date" className="mb-2 text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Return Date</label>
              <input
                id="return-date"
                type="date"
                min={pickupDate || new Date().toISOString().split('T')[0]}
                required
                value={returnDate}
                onChange={(e)=>setReturnDate(e.target.value)}
                className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700"
            >
              <img src={assets.search_icon} alt="Search" className="h-4 w-4" />
              Search
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          initial={{ y: 36, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
          className="relative w-full overflow-hidden rounded-[2rem] border-4 border-blue-500/20 bg-slate-100 p-8 shadow-xl sm:p-10"
        >
          <motion.img
            src={assets.main_car}
            alt="Hero"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-auto w-full object-contain"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Hero
