import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

//////////////////////////////////////////////////

const UserProductDetails = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/details/${id}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(err => console.error('Error fetching item details:', err));
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackLink to="/user">Back to Inventory</BackLink>
      <ProductCard>
        <ProductImage src={item.image} alt={item.name} />
        <ProductInfo>
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <Description>{item.description}</Description>
        </ProductInfo>
      </ProductCard>
    </Container>
  );
};

//////////////////////////////////////////////////

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #007bff;
`;

const ProductCard = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 50%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 20px;
  width: 50%;
`;

const Description = styled.p`
  margin-top: 10px;
`;

export default UserProductDetails;