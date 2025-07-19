import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <>
      <div className="search">
        <div className="search-cnt">
          <div className="search-box">
            <span className="search-icon">
              <i className="fa-light fa-magnifying-glass"></i>
            </span>
            <input type="text" className="search-input" placeholder="Search" />
          </div>
          <div className="search-filter-sort">
            <div className="search-sort">
              <button className="sort-icon mini-master-btn">
                <i className="fa-light fa-sliders"></i>
              </button>
              {/* <select className="search-filter-select">
                  <option value="">Filter</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </select> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search