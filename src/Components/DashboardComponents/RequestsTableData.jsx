import { format } from 'date-fns';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import {
  useGetProductRequestsQuery,
  useHandleProductRequestsMutation,
} from '../../Features/firebaseApi';
import Spinner from '../SubComponents/Spinner';

//this page is for incoming product requests
//user can accept or reject the requests they are given.

export default function RequestsTableData() {
  const { data, error, isFetching, isError } = useGetProductRequestsQuery(
    localStorage.getItem('userDocId')
  );

  const [handleProductRequests] = useHandleProductRequestsMutation();

  useEffect(() => {
    data && console.log('Queryden gelen data: ', data);
  }, [isFetching]);
  useEffect(() => {
    isError && console.log('Query Hatası: ', error);
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
          <tr className='productTable-rows-row'>
            <th scope='row'>{title.slice(0, 50)}</th>

            <td>{quantity}</td>
            <td>{customerMail}</td>
            <td>{format(date.seconds * 1000, 'MMM/dd/yyyy')}</td>
            <td>{totalPrice}</td>
            <td>{status}</td>
            <td>
              {status == 'confirmed' || status == 'rejected' ? (
                <MDBIcon icon='check' />
              ) : (
                <div>
                  <button
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
                </div>
              )}
            </td>
          </tr>
        );
      }
    );
  }
}
