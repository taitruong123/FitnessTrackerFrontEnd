import React from 'react' 
import {Link} from "react-router-dom"

const Header = (props) => {

    const logOut = () => {
        props.setToken('')
        props.setUsernameInput('')
        props.setPasswordInput('')
        props.setIsLoggedIn(false)
        props.setDisplayLogInButton(true)
      }

    return (
        <div className="header">
           <div>
             <h2>Welcome to Jumpin' Jack's Fitness App!</h2>
           </div>
           <div>
            <span><Link to='/'> My Routines </Link></span>
            <span><Link to='/activties'> Activities </Link></span>
            <span><Link to='/routnies'> Routines </Link></span>
           
            {
                props.isLoggedIn ? 
                
                <span><Link to='/login' onClick={logOut}>Log Out</Link></span>:
                <span><Link to='/login'>Log In or Register</Link></span>
            }  
            </div>
        </div >
    )
}

export default Header;