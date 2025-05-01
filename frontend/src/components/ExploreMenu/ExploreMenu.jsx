import React, { useContext } from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../context/StoreContext'

const ExploreMenu = ({category,setCategory}) => {

  const {category_list} = useContext(StoreContext)

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our foods</h1>
      <p className='explore-menu-text'>Choose category</p>
      <div className='explore-menu-list'>
        {category_list.map((item,index)=>{
          return (
            <div onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} key={index} className='explore-menu-list-item'>
              <img className={category===item.name?"active":""} src={item.image} alt='' />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
