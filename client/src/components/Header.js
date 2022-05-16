import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Logout from '../assets/svg/Logout';
import Profil from '../assets/svg/Profil';
import Settings from '../assets/svg/Settings';
import Question from '../assets/svg/Question';

import '../styles/header.scss'

export default function Header(props) {
  const navigate = useNavigate()
  const isAuth = props.isAuth
  const user = props.user
  
  const [showDropdown, setShowDropdown] = useState(false);
  
  const disconnection = () => {
    setShowDropdown(false)
    
    localStorage.clear()
    navigate('/login')
    window.location.reload(false);
  }
  
  return <div className='header-component'>
    <Link to='/'>
      <h1>Genely</h1>  
    </Link>
    
    {
      isAuth ?
      <div className='right-part'>
        <Link to='/new-component'>
          <p className='secondary-btn'>+ nouveau composant</p>
        </Link>
        
        <div className='pp-container' onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <Link to={user.username}>
            <img src={user.avatarUrl} alt='Profil' />
          </Link>
          { showDropdown &&
            <Dropdown
              user={user}
              hideDropdown={() => setShowDropdown(false)}
              disconnection={() => disconnection()}
            />
          }
        </div>
        
      </div>
      :
      <div className='btns'>
        <Link to='/login' className='tertiary-btn'>Connexion</Link>
        <Link to='/signup' className='secondary-btn'>Inscription</Link>
      </div>
    }
    
  </div>;
}

function Dropdown(props) {
  const user = props.user
  
  return <div className='dropdown'>
    {/* <div className='user-data'>
      <Link to={user.username} onClick={() => props.hideDropdown()}>
        <img src={user.avatarUrl} alt={user.username + '-picture'} />
        <div className='names'>
          <p className='fullname'>{ user.fullname }</p>
          <p className='username'>@{ user.username }</p>
        </div>
      </Link>
    </div> */}
    <div className='links'>
      <Link to={user.username} onClick={() => props.hideDropdown()}>
        <Profil />
        Profil
      </Link>
      <Link to={`${user.username}/settings`} onClick={() => props.hideDropdown()}>
        <Settings />
        Paramètres
      </Link>
      <Link to='/about' onClick={() => props.hideDropdown()}>
        <Question />
        A propos
      </Link>
      <Link to='/' onClick={() => props.disconnection()}>
        <Logout />
        Déconnexion
      </Link>
    </div>
  </div>
}