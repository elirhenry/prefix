import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//////////////////////////////////////////////////


const VisitorInventory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/items')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.log(err));
  }, []);

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
              <DetailsLink to={`/details/${item.id}`}>
                <td>{item.name}</td>
              </DetailsLink>
              <td>{item.quantity}</td>
              <td>{item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}</td>
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

//////////////////////////////////////////////////

export default VisitorInventory;