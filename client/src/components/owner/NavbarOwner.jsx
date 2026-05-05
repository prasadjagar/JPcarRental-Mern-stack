import React from 'react'
import { assets, dummyUserData } from '../../assets/assets'
import { Link } from 'react-router-dom';

const NavbarOwner = () => {
    const user = dummyUserData;
  return (
    <div>
        <Link to="/"><img src={assets.logo} alt='logo'/>
        </Link>
        <p>Welcome {user.name || 'Owner'}</p>
    </div>
  )
}

export default NavbarOwner