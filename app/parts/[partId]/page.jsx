'use client'
// app/parts/partId
import React, { useState, useEffect } from 'react';

const SinglePartPage = ({ params }) => {
  const { partId } = params;
  //console.log(partId);
  const [part, setPart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/parts/${partId}`);
        const data = await response.json();
        console.log(data);
        setPart(data.part);
      } 
      catch(error) {
        console.error('there was an error fetching the data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <li className="part-item">
      <div className="part-item__content">
        <div className="part-item__info">
          <h2>{part.name}</h2>
          <h3>PART SIZE: {part.size}</h3>
          <h3>Box quantity: {part.boxQuantity}</h3>
          <h3>CURRENT STOCK: {part.currentStock}</h3>
          <h3>Initial Stock: {part.initialStock}</h3>
          <h3>BARCODE ID: {part.barCodeId}</h3>
        </div>
      </div>
    </li>
  );
};

export default SinglePartPage
