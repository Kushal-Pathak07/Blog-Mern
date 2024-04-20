import React from 'react'
import {AppBar, Toolbar, Typography, styled} from '@mui/material';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Component = styled(AppBar)`
  background: #FFFFFF;
  color: black;
`
const Container = styled(Toolbar)`
  justify-content: center;
  & > a{
    padding: 20px;
    text-decoration: none;
    color: black;
  }
`

const Header = () => {

  const clickHandler = () => {
    toast.success("Logged out successfully !");
  }

  return (
    <Component>
      <Container>
        <Link to='/'>HOME</Link>
        <Link to='/about'>ABOUT</Link>
        <Link to='/contact'>CONTACT</Link>
        <Link to='/login' onClick={clickHandler}>LOGOUT</Link>
      </Container>
    </Component>
  )
}

export default Header;