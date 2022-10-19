import React, { useEffect, useState, useRef } from 'react';

import ProductTableData from '../Components/DashboardComponents/ProductTableData';
import UpdateProductForm from '../Components/DashboardComponents/UpdateProductForm';
import anonImg from '../Images/profile.webp';

//FIREBASE
import { query, onSnapshot, where, collection } from 'firebase/firestore';

import app, { productsRef, dataBase } from '../DataBASE/firebase';
import { useDispatch } from 'react-redux';
import { SET_USER_PRODUCTS } from '../Features/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const productCollection = collection(dataBase, 'products');

//NEW API IMPORTS - firebaseBranch
import { toast } from 'react-toastify';
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from '../Features/firebaseApi';
import Spinner from '../Components/SubComponents/Spinner';
import { MDBBtn } from 'mdb-react-ui-kit';

//

//REDUX
//bu sayfa lazyload yapılacak

function Dashboard() {
  //STATES
  let [userId, setUserId] = useState('');

  const [formState, setFormState] = useState({
    productTitle: '',
    productHaggle: false,
    productStock: 0,
    productOgPrice: 0,
    productSaleRate: 0,
  });

  //DECLARATIONS
  const modalRef = useRef();
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(() => {
          return user.uid;
        });
      }
    });
    unsub();
  }, []);

  //-getuserproducts!
  //-updateUserProduct! , realtime
  //-deleteUserProduct!
  //-addUserProduct Form with many Images!

  //firebaseBranch
  const {
    isError,
    isLoading,
    isFetching,
    isSuccess,
    data: dataArray,
    error,
  } = useGetProductsQuery(userId || '');

  useState(() => {
    isError && toast.error(error);
  }, [isError]);

  // let allUsersProducts = useSelector((state) => state.user.userProducts);

  useEffect(() => {
    if (dataArray) {
      console.log('dataArray: ', dataArray);
      dispatch(SET_USER_PRODUCTS(dataArray));
    }
  }, [dataArray, isFetching, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='profileCol'>
            <div className='profileCol-imageContainer'>
              <img src={anonImg} />
            </div>
            <h2>İsmail Sevgi</h2>
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
                    <td>Gender</td>
                    <td>Not Specified</td>
                  </tr>
                  <tr>
                    <td>Rate</td>
                    <td>3.2</td>
                  </tr>
                  <tr>
                    <td>Products</td>
                    <td>3</td>
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
              <table className='productTable ml-1'>
                <thead className='productTable-specs'>
                  <tr>
                    <td scope='col'>PRODUCT NAME</td>

                    <td scope='col'>STOCK</td>
                    <td scope='col'>ORIGINAL PRICE</td>
                    <td scope='col'>SALE RATE</td>
                    <td scope='col'>PRICE</td>

                    <td scope='col'>
                      <input placeholder='Search product...' />
                    </td>
                  </tr>
                </thead>

                <tbody className='productTable-rows'>
                  {dataArray?.map((product) => {
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
                  })}
                </tbody>
              </table>
              <div className='createProductDiv'>
                <MDBBtn color='mdb-color' className='text-xs-left'>
                  Create a new Product
                </MDBBtn>
              </div>
            </div>
            <div className='orderTable'>//Gelen siparişlerin olduğu table</div>
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
}

export default Dashboard;
