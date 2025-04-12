import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" className="footer-logo" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, fugit! Illo iusto, debitis ratione qui laborum obcaecati possimus blanditiis enim odit reprehenderit, fugit quidem corrupti optio, quia perspiciatis itaque. Omnis?</p>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>Contact us: 09123456789</li>
                    <li>contact@nnt.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright"></p>
    </div>
  )
}

export default Footer
