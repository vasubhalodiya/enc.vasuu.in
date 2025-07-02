import React from 'react'
import './Trash.css'
import Vaults from '@/components/Vaults/Vaults'
import VaultsData from '@/components/VaultsData/VaultsData'

const Trash = () => {
  return (
    <>
      <div className="trash">
        <div className="trash-cnt master-cnt">
          <Vaults />
          <VaultsData />
        </div>
      </div>
    </>
  )
}

export default Trash