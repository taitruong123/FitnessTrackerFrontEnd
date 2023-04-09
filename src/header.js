import React from 'react' 
import {Link} from "react-router-dom"

const Header = (props) => {

    const logOut = () => {
        props.setToken('')
        props.setIsLoggedIn(false)
        props.setDisplayLogInButton(true)
        props.setUsernameInput('')
        props.setPasswordInput('')
      }

    return (
        <header>
            <h2>Welcome to Jumpin' Jack's fitness app!</h2>
            {
                props.isLoggedIn ? 
                <div>
                    <span> <Link to='/'> Home Page </Link></span>
                        <span> <Link to='/activities'> Activities </Link></span>
                        <span><Link to='/login' onClick={logOut}>Log Out</Link></span>
                        <span><Link to='/myroutines'> My Routines </Link></span>
                    </div>
                :
                    <div>
                        <span> <Link to='/'> Home Page </Link></span>
                        <span> <Link to='/activities'> Activities </Link></span>
                        <span><Link to='/login'>Log In or Register</Link></span>
                    </div>
            }
        </header>
    )
}

export default Header;