import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <StyledButton onClick={() => loginWithRedirect()}>
      Login/Register
    </StyledButton>
    )
  );
}

//////////////////////////////////////////////////

const StyledButton = styled.button`
  background: none;
  border: none;
  color: black;
  outline: none;
  font-size:30px;
  color: black;
  top: 40%;
  padding: 20px;
  cursor: pointer;
`

//////////////////////////////////////////////////

export default LoginButton;