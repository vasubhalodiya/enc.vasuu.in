import React, { useState } from 'react'
import './Premium.css'
import { Link } from 'react-router-dom'
import images from '../../utils/Images'
import toast from 'react-hot-toast' // Toast library import

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanClick = (planName) => {
    if (selectedPlan === planName) return; // Already selected → do nothing

    setSelectedPlan(planName);
    toast.success(`${planName} plan selected successfully!`);
  };
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
            {/* Personal Plan */}
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
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>10 logins, notes and credit cards</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>5 vaults</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Secure storage</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Fast support</h5>
                  </li>
                </ul>
              </div>
              <div className="premium-btn-sec">
                <button className='premium-btn' onClick={() => handlePlanClick('Personal')}>Get Started</button>
              </div>
            </div>
            {/* Business Plan */}
            <div className="premium-card">
              <div className="premium-card-header">
                <h3 className='premium-card-header-plan-name'><i className="fa-solid fa-briefcase"></i>Business</h3>
                <h3 className='premium-card-header-plan-highlight'>Most Popular</h3>
              </div>
              <div className="premium-price-sec">
                <h1 className='premium-price'>₹149<span>/month</span></h1>
              </div>
              <div className="premium-plan-dec-sec">
                <p className='premium-plan-desc'>The perfact package for small business and agencies.</p>
              </div>
              <div className="premium-plan-lists">
                <ul className='premium-plan-list'>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>20 logins, notes and credit cards</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>25 vaults</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Integrated 2FA authenticator</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Priority support</h5>
                  </li>
                </ul>
              </div>
              <div className="premium-btn-sec">
                <button className='premium-btn' onClick={() => handlePlanClick('Business')}>Get Started</button>
              </div>
            </div>
            {/* Enterprise Plan */}
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
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Unlimited logins, notes and credit cards</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Unlimited vaults</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Integrated 2FA authenticator</h5>
                  </li>
                  <li className='premium-plan-list-item'>
                    <div><i className="fa-solid fa-check"></i></div>
                    <h5 className='premium-plan-list-feature'>Data breach monitoring</h5>
                  </li>
                </ul>
              </div>
              <div className="premium-btn-sec">
                <button className='premium-btn' onClick={() => handlePlanClick('Enterprise')}>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Premium