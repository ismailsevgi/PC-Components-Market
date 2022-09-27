import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  //Params gets the id from the URL
  const params = useParams();

  return <div>ProductDetailsPage: {params.id}</div>;
}

export default ProductDetailsPage;
