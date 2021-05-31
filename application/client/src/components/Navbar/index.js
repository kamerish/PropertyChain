import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/Create' activeStyle>
            Create
          </NavLink>
          <NavLink to='/Read' activeStyle>
            Read
          </NavLink>
          <NavLink to='/Update' activeStyle>
            Update
          </NavLink>
          <NavLink to='/Delete' activeStyle>
            Delete
          </NavLink>
          <NavLink to='/History' activeStyle>
            History
          </NavLink>
        </NavMenu>

      </Nav>
    </>
  );
};
  
export default Navbar;