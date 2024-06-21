import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

//////////////////////////////////////////////////

const Home = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.status === 201) {
        const data = await response.json();
        setUserData(data);
        setError(null);
        alert('Login success')
        window.location.href = 'http://localhost:3000/Home';
      } else {
        alert('User not found')
        throw new Error('User not found');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
    <Visitor>
        <p>Click here for:</p>
        <VisitorLink to={'/visitor'}>Visitor View</VisitorLink>
      </Visitor>
     <LoginBox>
     <Title>Login</Title>
     <br />
     <form onSubmit={handleSubmit}>
     <div>
     <Label>Username</Label>
       <InputField
         type="text"
         placeholder="Enter Username"
         value={userData.username}
         onChange={(event) => setUserData({ ...userData, username: event.target.value })}
       />
     </div>
     <br />
     <div>
     <Label>Password</Label>
       <InputField
         type="text"
         placeholder="Enter Password"
         value={userData.password}
         onChange={(event) => setUserData({ ...userData, password: event.target.value })}
         />
       </div>
       <Button type = "submit" onClick={() => console.log('Button Clicked')}>Login</Button>
       <Link to={'/register'}>Click Here to Register</Link>
       </form>
     </LoginBox>
     </>
   );
 };

//////////////////////////////////////////////////

const Visitor =styled.div`
font-size:20px;
text-align: center;
top: 20%;
`

const VisitorLink = styled(Link)`
  color: blue;

`
const LoginBox = styled.div`
  text-align:center;
  border: 2px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;`

const Title =styled.div`
font-size:20px;
`

const Label = styled.div`
font-size: 15px;
display:flex;
width:24%;
text-align:left;
padding-left: 10px;
`

const InputField = styled.input`
width: 100%;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
box-sizing: border-box;`

const Button = styled.button`
background-color: blue;
padding: 10px 20px;
margin: 8px 0;
border: none;
cursor: pointer;
width: 100%;
color: white;
`

//////////////////////////////////////////////////

export default Home;