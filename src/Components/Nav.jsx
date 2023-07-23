import React, { useEffect, useState } from 'react'
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false); 

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            }
            else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", null);
        };
    }, [])
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className='nav_logo' src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png" alt="netflix logo" />
            <img className='nav_avatar' src="https://wallpapers.com/images/thumbnail/netflix-profile-pictures-1000-x-1000-vnl1thqrh02x7ra2.webp" alt="avatar" />
        </div>
    )
}

export default Nav
