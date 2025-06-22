import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <>
      <div className="search">
        <div className="search-cnt">
          <div className="search-box">
            <span className="search-icon">
              <i class="ph ph-magnifying-glass"></i>
            </span>
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="home-filter-sort">
            <div className="home-filter">
              <button className="filter-icon">
                <i class="ph ph-funnel"></i>
              </button>
              {/* <select className="home-filter-select">
                  <option value="">Filter</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </select> */}
            </div>
            <div className="home-sort">
              <button className="sort-icon">
                <i class="ph ph-faders"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search