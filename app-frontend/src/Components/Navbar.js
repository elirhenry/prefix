import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

//////////////////////////////////////////////////


const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    isLoggedIn: !!user,
    userInitials: user ? getInitials(user.first_name, user.last_name) : '',
  };
};

const getInitials = (firstName, lastName) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const Navbar = () => {
  const { isLoggedIn, userInitials } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <HeaderStyle>
      <PlaceholderDiv />
      <HeaderLink to='/'>Saber-tory</HeaderLink>
      <ButtonContainer>
        {isLoggedIn && <InitialsCircle>{userInitials}</InitialsCircle>}
        <AuthButton onClick={isLoggedIn ? handleLogout : handleLogin}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </AuthButton>
      </ButtonContainer>
    </HeaderStyle>
  );
}


//////////////////////////////////////////////////

const HeaderStyle = styled.div`
  background-color: black;
  font-size: 50px;
  color: white;
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  text-align: center;
  flex: 1;
`;

const PlaceholderDiv = styled.div`
  width: 150px; // Increased to accommodate initials circle
`;

const ButtonContainer = styled.div`
  width: 150px; // Increased to accommodate initials circle
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AuthButton = styled.button`
  background-color: ${props => props.children === 'Login' ? 'green' : 'red'};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;

const InitialsCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: blue;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;


//////////////////////////////////////////////////

export default Navbar;