import React, { useState } from 'react'
import { dummyUserData, ownerMenuLinks, assets } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const user = dummyUserData;
    const location = useLocation();
    const [image, setImage] = useState('');
    const updateImage = async () => {
        user.image = URL.createObjectURL(image);
        setImage('');
    }
  return (
    <aside className="w-72 min-h-screen border-r border-slate-200 bg-white px-5 py-7">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
            <label htmlFor="image" className="relative inline-flex cursor-pointer items-end rounded-full">
                <img src={image ? URL.createObjectURL(image) : user?.image || 'https://via.placeholder.com/150'} alt="Profile" className="h-24 w-24 rounded-full object-cover shadow-md" />
                <div className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                    <img src={assets.edit_icon} alt="Edit" className="h-4 w-4" />
                </div>
                <input type="file" id="image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
            {image && (
                <button type="button" onClick={updateImage} className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                    <img src={assets.check_icon} alt="Save" className="h-4 w-4" />
                    Save
                </button>
            )}
            <p className="mt-6 text-lg font-semibold text-slate-900">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
        <nav className="space-y-2">
            {ownerMenuLinks.map((link, index) => {
                const isActive = link.path === location.pathname;
                return (
                    <NavLink key={index} to={link.path} className={`block rounded-2xl px-4 py-3 transition ${isActive ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                        <div className="flex items-center gap-3">
                            <img src={isActive ? link.coloredIcon : link.icon} alt={link.name} className="h-5 w-5" />
                            <span className="text-sm font-medium">{link.name}</span>
                        </div>
                    </NavLink>
                )
            })}
        </nav>
    </aside>
  )
}

export default Sidebar