import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-slate-900 text-gray-400 pt-16 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-8 max-w-7xl mx-auto'>
                <div className='max-w-xs'>
                    <img src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9 invert' />
                    <p className='text-sm text-gray-400'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                       <a href='#' className='hover:text-white transition'>
                        <img src={assets.facebook_icon} alt="Facebook" className='h-5 w-5 invert' />
                       </a>
                          <a href='#' className='hover:text-white transition'>  
                        <img src={assets.instagram_logo} alt="Instagram" className='h-5 w-5 invert' />
                          </a>
                          <a href='#' className='hover:text-white transition'>  
                        <img src={assets.twitter_logo} alt="Twitter" className='h-5 w-5 invert' />
                          </a>
                            <a href='#' className='hover:text-white transition'>        
                        <img src={assets.gmail_logo} alt="Gmail" className='h-5 w-5 invert' />
                            </a>
                    </div>
                </div>

                <div>
                    <p className='text-lg font-semibold text-white mb-4'>Quick Links</p>
                    <ul className='flex flex-col gap-3 text-sm'>
                        <li><a href="/" className='hover:text-white transition'>Home</a></li>
                        <li><a href="/cars" className='hover:text-white transition'>Browse Cars</a></li>
                        <li><a href="#" className='hover:text-white transition'>List Your Car</a></li>
                        <li><a href="#" className='hover:text-white transition'>About Us</a></li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg font-semibold text-white mb-4'>Resources</p>
                    <ul className='flex flex-col gap-3 text-sm'>
                        <li><a href="#" className='hover:text-white transition'>Help Center</a></li>
                        <li><a href="#" className='hover:text-white transition'>Terms of Service</a></li>
                        <li><a href="#" className='hover:text-white transition'>Privacy Policy</a></li>
                        <li><a href="#" className='hover:text-white transition'>Insurance</a></li>
                    </ul>
                </div>

                <div className='max-w-xs'>
                    <p className='text-lg font-semibold text-white mb-4'>Contact</p>
                    <ul className='flex flex-col gap-2 text-sm'>
                        <li>1234 Luxury Drive</li>
                        <li>San Francisco, CA 94107</li>
                        <li className='hover:text-white transition cursor-pointer'>+1 234 567890</li>
                        <li className='hover:text-white transition cursor-pointer'>info@example.com</li>
                    </ul>
                </div>
            </div>
            <hr className='border-gray-700 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 max-w-7xl mx-auto'>
                <p className='text-sm'>© {new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className='flex items-center gap-4 text-sm'>
                    <li><a href="#" className='hover:text-white transition'>Privacy</a></li>
                    <li className='text-gray-600'>|</li>
                    <li><a href="#" className='hover:text-white transition'>Terms</a></li>
                    <li className='text-gray-600'>|</li>
                    <li><a href="#" className='hover:text-white transition'>Cookies</a></li>
                </ul>
            </div>
        </footer>
  )
}

export default Footer