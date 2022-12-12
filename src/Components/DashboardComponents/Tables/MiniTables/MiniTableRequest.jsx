import { format } from 'date-fns';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetProductRequestsQuery,
  useHandleProductRequestsMutation,
} from '../../../../Features/firebaseApi';
import Spinner from '../../../SubComponents/Spinner';

function MiniTableRequest() {
  const { data, error, isFetching, isError } = useGetProductRequestsQuery(
    localStorage.getItem('userDocId')
  );

  const [handleProductRequests] = useHandleProductRequestsMutation();

  useEffect(() => {}, [isFetching]);
  useEffect(() => {
    isError && toast.error('Query Hatası: ', error);
  }, [isError]);

  if (isFetching) {
    return <Spinner />;
  } else {
    return data?.map(
      ({
        customerMail,
        date,
        quantity,
        status,
        title,
        totalPrice,
        orderId,
        id,
      }) => {
        return (
          <div className='productTable'>
            <div className='row'>
              <div className='column'>Product Name</div>
              <div className='column'>
                <Link to={`/productDetails/` + id}>{title.slice(0, 45)}</Link>
              </div>
            </div>
            <div className='row'>
              <div className='column'>Quantity</div>
              <div className='column'>{quantity}</div>
            </div>
            <div className='row'>
              <div className='column'>Customer Mail</div>
              <div className='column'>{customerMail}</div>
            </div>
            <div className='row'>
              <div className='column'>Date</div>
              <div className='column'>
                %{format(date.seconds * 1000, 'MMM/dd/yyyy')}
              </div>
            </div>
            <div className='row'>
              <div className='column'>Total Price</div>
              <div className='column'>{totalPrice}$</div>
            </div>
            <div className='row'>
              <div className='column'>
                {status == 'confirmed' || status == 'rejected' ? (
                  <MDBIcon icon='check' />
                ) : (
                  <>
                    <button
                      className='btn btn-info'
                      onClick={() =>
                        handleProductRequests({
                          type: 'confirm',
                          orderId,
                          productId: id,
                        })
                      }
                    >
                      Confirm
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() =>
                        handleProductRequests({
                          type: 'reject',
                          orderId,
                          productId: id,
                        })
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      }
    );
  }
}

export default MiniTableRequest;
