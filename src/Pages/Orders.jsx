import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useGetUsersOrdersQuery,
  useUpdateOrderMutation,
} from '../Features/firebaseApi';

export default function Orders() {
  const { data, error, isFetching, isError } = useGetUsersOrdersQuery(
    localStorage.getItem('userDocId')
  );

  const [updateOrder] = useUpdateOrderMutation();

  function handleDisplay(id) {
    let content = document.getElementById(id);
    console.log('content: ', content);
    if (content.classList.contains('show')) {
      content.classList.remove('show');
    } else {
      content.classList.add('show');
    }
  }

  function CancelOrderFun(orderId) {
    if (window.confirm('Are you really want to cancel this order?')) {
      updateOrder({ type: 'cancel', orderId });
      toast.success('Your order canceled successfully!');
    }
  }

  useEffect(() => {
    data && console.log('Gelen user data: ', data);
  }, [isFetching]);

  useEffect(() => {
    isError && console.log('Something went wrong:', error);
  }, [isError]);

  return (
    <div className='container'>
      <div className='orderContainer'>
        <div className='orderContainer-title'>My Orders</div>
        {data &&
          data.map(({ orderId, orderStatus, products }) => {
            //If every product is confirmed; product's status is "finished"
            let totalOrderStatus = products.every(
              (product) => product.status == 'confirmed'
            );

            //don't render if any product's status is "confirmed"
            let someOrderStatus = products.some(
              (product) => product.status == 'confirmed'
            );

            return (
              <div key={orderId} className='orderDropdowns'>
                <div
                  className='orderDropdowns-title'
                  style={{
                    backgroundImage:
                      orderStatus === 'confirmed'
                        ? 'var(--orderSuccess)'
                        : orderStatus === 'rejected'
                        ? 'var(--orderRejected)'
                        : 'var(--orderWaiting)',
                  }}
                >
                  <div className='orderDropdowns-title-detail'>
                    <h3>
                      <strong>Order ID:</strong>
                      {`${orderId} 
                  `}
                    </h3>
                    <h5
                      style={{
                        color:
                          orderStatus == 'continues'
                            ? 'var(--greenDark)'
                            : 'var(--redDark)',
                      }}
                    >
                      <strong>
                        Order Status:{' '}
                        {totalOrderStatus ? 'Finished' : `${orderStatus}`}
                      </strong>
                    </h5>
                  </div>
                  <MDBIcon
                    fas
                    icon='angle-down'
                    onClick={() => handleDisplay(orderId)}
                  />
                </div>
                <div id={orderId} className='orderDropdowns-content'>
                  {products.map(
                    ({ productImageUrl, seller, status, title }, index) => {
                      return (
                        <div key={orderId + index} className='product'>
                          <div className='img-container'>
                            <img src={productImageUrl} alt='Product Image' />
                          </div>
                          <div className='details'>
                            <div>Product Name:{title.slice(0, 50)}</div>
                            <div>
                              <strong>Seller:</strong> {seller}
                            </div>
                            <div
                              style={{
                                color:
                                  status == 'waiting' || status == 'confirmed'
                                    ? `var(--greenDark)`
                                    : `var(--redDark)`,
                              }}
                            >
                              <strong>Status:</strong>
                              <span>
                                {orderStatus != 'canceled'
                                  ? status
                                  : 'Order has been canceled'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                  <div className='dropdownFooter'>
                    <strong>
                      Total Price:
                      {products.reduce((prev, cur) => {
                        return prev + cur.totalPrice;
                      }, 0)}
                      $
                    </strong>
                    {!someOrderStatus && (
                      <button
                        className='btn btn-danger'
                        onClick={() => CancelOrderFun(orderId)}
                        disabled={orderStatus == 'canceled' ? true : false}
                      >
                        CANCEL ORDER
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
