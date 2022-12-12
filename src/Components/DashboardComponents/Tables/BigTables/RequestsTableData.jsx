import { format } from 'date-fns';
import { MDBIcon } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useGetProductRequestsQuery,
  useHandleProductRequestsMutation,
} from '../../../../Features/firebaseApi';
import Spinner from '../../../SubComponents/Spinner';

//this page is for incoming product requests
//user can accept or reject the requests they are given.

export default function RequestsTableData() {
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
          <tr className='table-rows'>
            <th scope='row'>{title.slice(0, 50)}</th>

            <td>{quantity}</td>
            <td>{customerMail}</td>
            <td>{format(date.seconds * 1000, 'MMM/dd/yyyy')}</td>
            <td>{totalPrice}</td>

            {status == 'confirmed' || status == 'rejected' ? (
              <td>
                <MDBIcon icon='check' />
              </td>
            ) : (
              <td>
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
              </td>
            )}
          </tr>
        );
      }
    );
  }
}
