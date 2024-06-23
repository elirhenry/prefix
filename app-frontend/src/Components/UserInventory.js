import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import EditItem from './EditItem';

//////////////////////////////////////////////////

const UserInventory = () => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [editingItem, setEditingItem] = useState(null);

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
        setData(prevData => prevData.filter(item => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem) => {
    setData(prevData => prevData.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
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
              <DetailsLink to={`/product_details/${item.id}`}><td>{item.name}</td></DetailsLink>
              <td>{item.quantity}</td>
              <td>{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</td>
              <td>
                <EditButton onClick={() => handleEdit(item)}>Edit</EditButton>
                <DeleteButton onClick={() => handleDelete(item.id)}>Delete</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      {editingItem && (
        <EditSection>
          <h3>Edit Item</h3>
          <EditItem
            item={editingItem}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        </EditSection>
      )}
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

const EditButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const EditSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

//////////////////////////////////////////////////

export default UserInventory;