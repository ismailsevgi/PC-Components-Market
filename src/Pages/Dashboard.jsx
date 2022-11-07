import React, { useEffect, useState, useRef } from 'react';

import ProductTableData from '../Components/DashboardComponents/ProductTableData';
import UpdateProductForm from '../Components/DashboardComponents/UpdateProductForm';
import anonImg from '../Images/profile.webp';

import { useDispatch } from 'react-redux';

//NEW API IMPORTS - firebaseBranch
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '../Features/firebaseApi';
import Spinner from '../Components/SubComponents/Spinner';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function Dashboard({ userDetails }) {
  //spinner control burada olacak
  //true tablodaki loading bittiği anda buradaki spinner state i false
  console.log("Dashboard'a gelen user details:", userDetails);
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
  const dispatch = useDispatch();

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
        <div className='profileCol'>
          <div className='profileCol-imageContainer'>
            <img src={anonImg} />
          </div>
          <h2>
            {userDetails ? userDetails.displayName : 'Username not Found'}
          </h2>
          <div className='profileCol-userDetails'>
            <table>
              <thead>
                <tr>
                  <td>User Informations</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Birth Date</td>
                  <td>Not Specified</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userDetails ? userDetails.email : 'Not known'}</td>
                </tr>
                <tr>
                  <td>Ongoing Purchases</td>
                  <td>3.2</td>
                </tr>
                <tr>
                  <td>Products</td>
                  <td>{dataArray && dataArray.length}</td>
                </tr>
                <tr>
                  <td>Sold</td>
                  <td>5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='dashboard-panel'>
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
          <div className='productsDiv'>
            <table className='productTable'>
              <thead className='productTable-specs'>
                <tr>
                  <td scope='col'>PRODUCT NAME</td>

                  <td scope='col'>CUSTOMER</td>
                  <td scope='col'>CUSTOMER EMAIL</td>
                  <td scope='col'>DATE</td>
                  <td scope='col'>PRICE</td>

                  <td scope='col'>STATUS</td>
                </tr>
              </thead>

              <tbody className='productTable-rows'></tbody>
            </table>
          </div>
        </div>
      </div>
      <div ref={modalRef} className='bg-productForm '>
        <div className='bg-productForm-content'>
          <UpdateProductForm formState={formState} modalRef={modalRef} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
