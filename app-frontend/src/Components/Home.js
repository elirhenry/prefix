import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

//////////////////////////////////////////////////

const Home = () => {
  const{ isLoading, error } = useAuth0();
  return (
    <div>
      <main className='column'>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
          <LoginButton/>
          <LogoutButton/>
          <Profile/>
          </>
        )}
      </main>
      <Visitor>
        <VisitorLink to={'/inventory'}>Visitor</VisitorLink>
      </Visitor>
    </div>
  );
}

//////////////////////////////////////////////////

const Visitor =styled.div`
font-size:30px;
color: black;
text-align: center;
top: 30%;
padding: 20px;
`

const VisitorLink = styled(Link)`
  text-decoration: none;
  color: black;
`

//////////////////////////////////////////////////

export default Home;