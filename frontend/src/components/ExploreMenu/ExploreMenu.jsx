import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = () => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our foods</h1>
      <p className='explore-menu-text'>Choose food...</p>
      <div className='explore-menu-list'>
        {menu_list.map(()=>{
          return (
            <div key={index} className='explore-menu-list-item'>
              <img src={item.menu_item} alt=""/>
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMenu
