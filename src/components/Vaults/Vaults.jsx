import React from 'react'
import './Vaults.css'
import Search from '../Search/Search'

const Vaults = () => {
  return (
    <>
      <div className="vaults">
        <div className="vaults-search">
          <Search />
        </div>
        <div className="vaults-cnt">
          <div className="vaults-add-multiselect">
            <button className="vaults-multiselect"><i class="fa-light fa-check-double"></i>Multiple Select</button>
            <button className="vaults-add-btn"><i class="fa-light fa-plus"></i>Add Password</button>
          </div>
          <div className="vaults-list-group">
            <h6 className="vaults-title master-title">Vaults</h6>
            <div className="vaults-menu">
              <ul className="vaults-menu-list">
                <li><button className="vaults-menu-item"><i class="fa-light fa-user"></i>my password</button></li>
                <li><button className="vaults-menu-item"><i class="fa-light fa-user"></i>office password</button></li>
                <li><button className="vaults-menu-item"><i class="fa-light fa-user"></i>auth pass</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vaults