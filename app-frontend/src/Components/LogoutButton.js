import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <StyledButton>
        <button onClick={() => logout()}>Sign Out</button>
      </StyledButton>

    )
  )
}

//////////////////////////////////////////////////

const StyledButton =styled.div`
margin-bottom: 25px;
;`

//////////////////////////////////////////////////

export default LogoutButton;