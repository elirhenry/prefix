import React from 'react';
import styled from 'styled-components';

//////////////////////////////////////////////////

const DeleteItemButton = ({ itemId, userId, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
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

        onDelete(itemId);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  return <StyledButton onClick={handleDelete}>Delete</StyledButton>;
};

//////////////////////////////////////////////////

const StyledButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

//////////////////////////////////////////////////

export default DeleteItemButton;