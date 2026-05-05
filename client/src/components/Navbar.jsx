import React from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { toast } from 'react-hot-toast';
import { motion } from "motion/react";
const Navbar=()=>{
    const {setShowLogin,user,logout,isOwner,axios,setIsOwner}=useAppContext()
    const navigate = useNavigate();
    const changeRole=async (params) => {
        try {
         const {data}=   await axios.post('/api/owners/change-role')
         if(data.success){
            setIsOwner(true)
            toast.success(data.message)
         }else{
            toast.error(data.message)
         }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <motion.header
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="sticky top-0 z-50 bg-white/95 shadow-sm shadow-slate-200 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/" className="flex items-center gap-3 text-slate-900">
                    <img src={assets.logo} alt="CarRental" className="h-10 w-auto"/>
                </Link>
                </motion.div>

                <nav className="hidden items-center gap-8 md:flex">
                    {menuLinks.map((link,index)=>(
                        <motion.div key={index} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                        <Link to={link.path} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                            {link.name}
                        </Link> 
                        </motion.div>
                    ))}
                </nav>

                <div className="flex flex-1 items-center justify-end gap-4">
                    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-500 shadow-sm sm:flex">
                        <img src={assets.search_icon} alt="Search" className="h-4 w-4"/>
                        <input
                            type="text"
                            placeholder="Search cars"
                            className="w-48 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </div>
                    <motion.button
                        onClick={() =>isOwner? navigate("/owner"): changeRole()}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                    > {isOwner? 'Dashboard':'List Cars'}
                    </motion.button>
                    <motion.button
                        onClick={() => {user? logout():setShowLogin(true)}}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
                    >
                        {user? 'Logout':'Login'}
                    </motion.button>
                </div>
            </div>
        </motion.header>
    )
}
export default Navbar;
