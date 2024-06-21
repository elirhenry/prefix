import { useAuth0 } from '@auth0/auth0-react';
// import LogoutButton from './LogoutButton'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();



  return (
    isAuthenticated && (
      <div>
        {/* <LogoutButton/> */}
        <article>
        {user?.picture && <img src={user.picture} alt={user?.name}></img>}
      </article>
      <StoreInventory>
        <MyStoreLink to={'/my-store'}>My Store Inventory</MyStoreLink>
      </StoreInventory>
      <AllInventory>
        <MyStoreLink to={'/every-store'}>All Inventory</MyStoreLink>
      </AllInventory>
      </div>
    )
  )
}

//////////////////////////////////////////////////

const StoreInventory =styled.div`
font-size:30px;
color: black;
text-align: center;
top: 30%;
padding: 20px;
`

const MyStoreLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const AllInventory =styled.div`
font-size:30px;
color: black;
text-align: center;
top: 30%;
padding: 20px;
`

//////////////////////////////////////////////////

export default Profile;