import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

//////////////////////////////////////////////////

const AddNewItem = () => {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    image: null,
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const itemData = {
        user_id: user.id, // Get user_id from logged-in user
        ...newItem,
      };

      const response = await fetch('http://localhost:8080/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add item');
      }

      alert('Item added successfully');
      navigate('/user'); // Route back to the user's inventory page
    } catch (error) {
      console.error('Error adding item:', error);
      alert(error.message || 'Failed to add item. Please try again.');
    }
  };

  return (
    <AddItemBox>
      <Title>Add New Item</Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name:</Label>
            <InputField
              type="text"
              name="name"
              placeholder="Enter Name"
              value={newItem.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Quantity:</Label>
            <InputField
              type="number"
              name="quantity"
              placeholder="Enter Quantity"
              value={newItem.quantity}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Image Upload:</Label>
            <InputFileField
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description:</Label>
            <TextareaField
              name="description"
              placeholder="Enter Description"
              value={newItem.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Add Item</Button>
        </form>
      </FormContainer>
    </AddItemBox>
  );
};


//////////////////////////////////////////////////

const AddItemBox = styled.div`
  text-align: center;
  border: 2px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  max-width: 800px; /* Adjust as needed */
`;

const Title = styled.div`
  font-size: 25px;
  padding: 12px 20px;
`;

const FormContainer = styled.div`
  max-width: 500px; /* Adjust as needed */
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 15px;
  display: block;
  text-align: left;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const InputFileField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const TextareaField = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  background-color: blue;
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  color: white;
`;



export default AddNewItem;
