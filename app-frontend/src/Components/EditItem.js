import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditItem = ({ item, onSave, onCancel }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/items/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      onSave(editedItem);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={editedItem.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        type="number"
        name="quantity"
        value={editedItem.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <TextArea
        name="description"
        value={editedItem.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <ButtonGroup>
        <SaveButton type="submit">Save</SaveButton>
        <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 5px;
`;

const TextArea = styled.textarea`
  padding: 5px;
  height: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export default EditItem;