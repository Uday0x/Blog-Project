import React from 'react'
import {Conatiner ,Logo,LogoutBtn} from "../index.js"
//import Link ,use selctor ,use navigate 

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Header = () => {

  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navItems =[
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active:!authStatus
    },
    {
      name:"All Posts",
      slug:"/all-posts",
      active:authStatus
    },
    {
      name:"Add Post",
      slug:"/add-post",
      active:authStatus
    }
  ]
  return (
    <div>
      <header className='py-3 shadow bg-grap-500'>
        <Conatiner>
          <nav className='flex'>
              <div className='mr-4'>
                  <Link to ="/">
                    <Logo width ="70px" />
                  </Link>
              </div>

              <ul className='flex ml-auto'>
                {navItems.map((item)=>
               item.active ? (
                  <li key={item.name}
                  >
                    <button
                    onClick={()=>navigate(item.slug)}
                    className='inline-back px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >{item.name}</button>
                  </li>
               ):null
              )}  

              {/* logout btn will only be visible only when the user is logged in meaning authStatus is true */}
              {authStatus && (
                  <li>
                      <LogoutBtn />
                  </li>
              )}
              </ul>
          </nav>
        </Conatiner>
      </header>
    </div>
  )
}

export default Header
