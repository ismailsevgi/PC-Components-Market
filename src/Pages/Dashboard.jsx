import React, { useEffect, useState, useRef } from 'react';

import ProductTableData from '../Components/DashboardComponents/ProductTableData';
import UpdateProductForm from '../Components/DashboardComponents/UpdateProductForm';

//NEW API IMPORTS - firebaseBranch
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '../Features/firebaseApi';
import Spinner from '../Components/SubComponents/Spinner';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import RequestsTableData from '../Components/DashboardComponents/RequestsTableData';
import ProfileColumn from '../Components/DashboardComponents/ProfileColumn';

function Dashboard({ userDetails }) {
  //spinner control burada olacak
  //true tablodaki loading bittiği anda buradaki spinner state i false

  //STATES
  const userDocId = localStorage.getItem('userDocId');

  const [formState, setFormState] = useState({
    productTitle: '',

    productStock: 0,
    productOgPrice: 0,
    productSaleRate: 0,
  });

  //DECLARATIONS
  const modalRef = useRef();

  //firebaseBranch
  const {
    isError,
    isLoading,
    isFetching,
    isSuccess,
    data: dataArray,
    error,
  } = useGetProductsQuery({ type: 'userProducts', label: userDocId } || '');

  useState(() => {
    isError && toast.error(error);
  }, [isError, userDocId]);

  // let allUsersProducts = useSelector((state) => state.user.userProducts);

  useEffect(() => {
    if (dataArray) {
      console.log('dataArray: ', dataArray);
      // dispatch(SET_USER_PRODUCTS(dataArray));
    }
  }, [dataArray, isFetching, isSuccess]);

  return (
    <div className='dashboard'>
      <div className='container'>
        <ProfileColumn userDetails={userDetails} dataArray={dataArray} />

        <div className='dashboard-panel'>
          <div className='dashboard-products'>
            <h3>My Products</h3>
            <div className='productsDiv'>
              <table className='productTable'>
                <thead className='productTable-specs'>
                  <tr>
                    <td scope='col'>PRODUCT NAME</td>

                    <td scope='col'>STOCK</td>
                    <td scope='col'>ORIGINAL PRICE</td>
                    <td scope='col'>SALE RATE</td>
                    <td scope='col'>PRICE</td>

                    <td scope='col'></td>
                  </tr>
                </thead>

                <tbody className='productTable-rows'>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    dataArray?.map((product) => {
                      return (
                        <ProductTableData
                          key={product.id}
                          data={{
                            id: product.id,
                            title: product.title,
                            haggle: product.haggle,
                            stock: product.stock,
                            price: product.price,
                            saleRate: product.saleRate,
                          }}
                          modalRef={modalRef}
                          setFormState={setFormState}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
              <div className='createProductDiv'>
                <Link to='/productAdd'>
                  <MDBBtn color='mdb-color' className='text-xs-left'>
                    Create a new Product
                  </MDBBtn>
                </Link>
              </div>
            </div>
          </div>
          <br></br>
          <div className='dashboard-products'>
            <h3>Product Requests</h3>
            <div className='productsDiv'>
              <table className='productTable'>
                <thead className='productTable-specs'>
                  <tr>
                    <td scope='col'>PRODUCT NAME</td>
                    <td scope='col'>QUANTITY</td>
                    <td scope='col'>CUSTOMER EMAIL</td>
                    <td scope='col'>DATE</td>
                    <td scope='col'>PRICE</td>
                    <td scope='col'>STATUS</td>
                  </tr>
                </thead>

                <tbody className='productTable-rows'>
                  <RequestsTableData />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div ref={modalRef} className='bg-productForm '>
        <UpdateProductForm formState={formState} modalRef={modalRef} />
      </div>
    </div>
  );
}

export default Dashboard;
