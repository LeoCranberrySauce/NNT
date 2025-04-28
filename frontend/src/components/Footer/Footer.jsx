import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className="footer-logo" />
                    <p>Delicious food delivered to your doorstep. NNT Purple Food House offers a wide variety of cuisines to satisfy your cravings.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-links">
                    <h2>QUICK LINKS</h2>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/#explore-menu">Menu</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                        <li>
                            <Link to="/order">Place Order</Link>
                        </li>
                    </ul>
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
                        <li><i className="fas fa-map-marker-alt"></i> East Quirino Hill, Baguio City</li>
                        <li><i className="fas fa-phone"></i> 09123456789</li>
                        <li><i className="fas fa-envelope"></i> contact@nnt.com</li>
                    </ul>
                    <div className="footer-app-downloads">
                        <h2>You can download these on your mobile phones!</h2>
                        <div className="footer-store-links">
                            <a href="#">
                                <img src={assets.app_store} alt="App Store" />
                            </a>
                            <a href="#">
                                <img src={assets.play_store} alt="Play Store" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">&copy; {new Date().getFullYear()} NNT Purple Food House. All rights reserved. This food stall is afiliated with Purple Blend Franchise.</p>
        </div>
    )
}

export default Footer
