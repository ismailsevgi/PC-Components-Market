import React, { useEffect, useState, useRef } from 'react';

import UpdateProductForm from '../Components/DashboardComponents/UpdateProductForm';

//NEW API IMPORTS - firebaseBranch
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '../Features/firebaseApi';
import Spinner from '../Components/SubComponents/Spinner';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

//Tables
import ProductTableData from '../Components/DashboardComponents/Tables/BigTables/ProductTableData';
import RequestsTableData from '../Components/DashboardComponents/Tables/BigTables/RequestsTableData';
import ProfileColumn from '../Components/DashboardComponents/Profile/ProfileColumn';
import MiniTableProduct from '../Components/DashboardComponents/Tables/MiniTables/MiniTableProduct';
import MiniTableRequest from '../Components/DashboardComponents/Tables/MiniTables/MiniTableRequest';

function Dashboard() {
  const userDocId = localStorage.getItem('userDocId');

  const [miniTableStatus, setMiniTableStatus] = useState(true);

  //Local STATES
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
  }, [isError, userDocId, dataArray, isFetching, isSuccess]);

  return (
    <div className='dashboard'>
      <div className='myContainer'>
        <ProfileColumn dataArray={dataArray} />

        <div className='dashboard-panel'>
          <div className='dashboard-table'>
            <div className='miniTableTitles'>
              <button onClick={() => setMiniTableStatus(true)}>
                MY PRODUCTS
              </button>
              <button onClick={() => setMiniTableStatus(false)}>
                MY REQUESTS
              </button>
            </div>
            <h3>My Products</h3>

            <div className='tableDiv'>
              <table className='table'>
                <thead className='table-head-product'>
                  <tr>
                    <td className='productName_Product'>PRODUCT NAME</td>

                    <td className='stock'>STOCK</td>
                    <td className='originalPrice'>ORIGINAL PRICE</td>
                    <td className='saleRate'>SALE RATE</td>
                    <td className='price'>PRICE</td>

                    <td className='empty'></td>
                  </tr>
                </thead>

                <tbody className='table-rows-product'>
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

            <div className='miniTable'>
              {!miniTableStatus && <MiniTableRequest />}
              {miniTableStatus &&
                dataArray?.map((product) => {
                  return (
                    <MiniTableProduct
                      key={product.id}
                      data={{
                        id: product.id,
                        title: product.title,

                        stock: product.stock,
                        price: product.price,
                        saleRate: product.saleRate,
                      }}
                      modalRef={modalRef}
                      setFormState={setFormState}
                    />
                  );
                })}
            </div>
          </div>

          <div className='dashboard-table'>
            <h3>Product Requests</h3>
            <div className='tableDiv'>
              <table className='table'>
                <thead className='table-head-request'>
                  <tr>
                    <td className='productName_Request'>PRODUCT NAME</td>
                    <td className='quantity'>QUANTITY</td>
                    <td className='customerEmail'>CUSTOMER EMAIL</td>
                    <td className='date'>DATE</td>
                    <td className='price'>PRICE</td>
                    <td className='status'>STATUS</td>
                  </tr>
                </thead>

                <tbody className='table-rows-request'>
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
