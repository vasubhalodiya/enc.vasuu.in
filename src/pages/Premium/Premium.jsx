import React from 'react'
import './Premium.css'
import { Link } from 'react-router-dom'
import images from '../../utils/Images'

const Premium = () => {
  return (
    <>
      <div className="premium">
        <div className="premium-logo">
          <Link to="/" className='back-to-home'>
            <i className="fa-regular fa-arrow-left"></i>
          </Link>
          <Link to="/">
            <h3 className="encrypt-logo">Encrypt</h3>
          </Link>
          <div></div>
        </div>
        <div className="premium-cnt">
          <div className="premium-card-head">
            <p className='premium-access-premium'>Access Premium</p>
            <h2 className='premium-big-txt'>It's easy to get started</h2>
            <h2 className='premium-small-txt'>Choose the best plan to enjoy the best movies and series</h2>
          </div>
          <div className="premium-card-group">
            <div className="premium-card">
              <div className="premium-card-header">
                <h3 className='premium-card-header-plan-name'><i className="fa-solid fa-user"></i>Personal</h3>
                <h3 className='premium-card-header-plan-highlight'>Basic</h3>
              </div>
              <div className="premium-price-sec">
                <h1 className='premium-price'>₹79<span>/month</span></h1>
              </div>
              <div className="premium-plan-dec-sec">
                <p className='premium-plan-desc'>The perfact package for small business and agencies.</p>
              </div>
              <div className="premium-plan-lists">
                <ul className='premium-plan-list'>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>10 logins, notes and credit cards</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>5 vaults</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Secure storage</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Fast support</li>
                </ul>
              </div>
              <div className="premium-btn-sec">
                <button className='premium-btn'>Get Started</button>
              </div>
            </div>
            <div className="premium-card">
              <div className="premium-card-header">
                <h3 className='premium-card-header-plan-name'><i className="fa-solid fa-briefcase"></i>Business</h3>
                <h3 className='premium-card-header-plan-highlight'>Best Value</h3>
              </div>
              <div className="premium-price-sec">
                <h1 className='premium-price'>₹149<span>/month</span></h1>
              </div>
              <div className="premium-plan-dec-sec">
                <p className='premium-plan-desc'>The perfact package for small business and agencies.</p>
              </div>
              <div className="premium-plan-lists">
                <ul className='premium-plan-list'>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>20 logins, notes and credit cards</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>25 vaults</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Integrated 2FA authenticator</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Priority support</li>
                </ul>
              </div>
              <div className="premium-btn-sec">
                <button className='premium-btn'>Get Started</button>
              </div>
            </div>
            <div className="premium-card">
              <div className="premium-card-header">
                <h3 className='premium-card-header-plan-name'><i className="fa-solid fa-apartment"></i>Enterprise</h3>
                <h3 className='premium-card-header-plan-highlight'>Advanced</h3>
              </div>
              <div className="premium-price-sec">
                <h1 className='premium-price'>₹289<span>/month</span></h1>
              </div>
              <div className="premium-plan-dec-sec">
                <p className='premium-plan-desc'>The perfact package for small business and agencies.</p>
              </div>
              <div className="premium-plan-lists">
                <ul className='premium-plan-list'>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Unlimited logins, notes and credit cards</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Unlimited vaults</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Integrated 2FA authenticator</li>
                  <li className='premium-plan-list-item'><i className="fa-solid fa-check"></i>Data breach monitoring</li>
                </ul>
              </div>
              <div className="premium-btn-sec">
                <button className='premium-btn'>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Premium