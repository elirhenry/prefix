import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//////////////////////////////////////////////////

const UserInventory = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/items/${userId}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(err => console.log(err));
    }
  }, [userId]);

  return (
    <div className='container mt-5'>
      <AddItemLink to={'/add-item'}>New Item +</AddItemLink>
      <StyledTable className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
                <DetailsLink to={'/details'}>
                  <td>{item.name}</td>
                </DetailsLink>
              <td>{item.quantity}</td>
              <td>{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</td>
              <EditButton><button>Edit</button></EditButton>
              <DeleteButton><button>Delete</button></DeleteButton>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

//////////////////////////////////////////////////

const DetailsLink = styled(Link)`
  text-decoration: none;
  color: blue;
`;

const AddItemLink = styled(Link)`
text-decoration: none;
color: white;
background-color: green;
padding: 0.5rem 1rem;
display: inline-block;
margin-top: 10px;
margin;
`

const StyledTable =styled.table`
width: 100%;
border-spacing: 1rem;
margin-left: 2.5rem;
`

const EditButton = styled.td`
  button {
    background-color: blue;
    color: white;
  }
`

const DeleteButton = styled.td`
  button {
    background-color: red;
    color: white;
  }
`

//////////////////////////////////////////////////

export default UserInventory;