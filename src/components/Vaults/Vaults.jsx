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
            <button className="vaults-multiselect"><i class="ph ph-checks"></i>Multiple Select</button>
            <button className="vaults-add-btn"><i class="ph ph-plus"></i>Add Password</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vaults