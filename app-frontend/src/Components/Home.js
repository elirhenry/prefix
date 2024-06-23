import React, {useState} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

//////////////////////////////////////////////////

const Home = () => {
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        alert('Login successful');
        navigate('/user');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      alert('Login failed: ' + error.message);
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
        <p>or log in below</p>
      </Visitor>
      <LoginBox>
        <Title>Login</Title>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <Label>Username</Label>
            <InputField
              type="text"
              name="username"
              placeholder="Enter Username"
              value={userData.username}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <Label>Password</Label>
            <InputField
              type="password"
              name="password"
              placeholder="Enter Password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Login</Button>
          <Link to={'/register'}>Click Here to Register</Link>
        </form>
      </LoginBox>
    </>
  );
};

//////////////////////////////////////////////////

const Visitor =styled.div`
text-align:center;
  border: 2px solid;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 23px;`

const VisitorLink = styled(Link)`
  color: blue;
  font-size: 25px;
`
const LoginBox = styled.div`
  text-align:center;
  border: 2px solid;
  position: absolute;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;`

const Title =styled.div`
font-size:25px;
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