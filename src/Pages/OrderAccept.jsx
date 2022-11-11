import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Components/SubComponents/Spinner';
import { useGetOrderQuery } from '../Features/firebaseApi';

import { format } from 'date-fns';
import CreatedOrders from '../Components/OrderAccept/CreatedOrders';
import { toast } from 'react-toastify';

export default function OrderAccept() {
  const params = useParams();
  const { isFetching, isError, data, error } = useGetOrderQuery(params.orderId);

  useEffect(() => {
    if (data) {
      console.log('Order: ', data);
    }
  }, [isFetching]);

  useEffect(() => {
    isError && toast.error('Something went wrong!');
  }, [isError]);

  return (
    <div className='container'>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className='orderPage'>
          <div className='orderPage-details'>
            <h3>Your order has received successfully</h3>
            <div className='orderPage-details-detail'>
              <span>
                <strong>Order ID:</strong>
                {data?.orderId}
              </span>
              <span
                style={{
                  color: data.orderStatus == 'continues' ? 'green' : 'red',
                }}
              >
                <strong>Status: </strong> {data.orderStatus}
              </span>
              <span>
                <strong>Date:</strong>
                {format(new Date(), 'yyyy/MM/dd HH:mm')}
              </span>
            </div>
          </div>

          <div className='orderPage-products'>
            {data?.products.map((product) => {
              return <CreatedOrders product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
