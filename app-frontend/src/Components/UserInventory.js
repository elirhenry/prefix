import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//////////////////////////////////////////////////

const UserInventory = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
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
  }, [userId, refresh]);

  const handleAddItem = () => {
    setRefresh(prev => prev + 1);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Delete this forever, are you sure?')) {
      try {
        const response = await fetch(`http://localhost:8080/items/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        // Remove the deleted item from the local state
        setData(prevData => prevData.filter(item => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

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
            <th>Actions</th>
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
              <DeleteButton>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </DeleteButton>
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