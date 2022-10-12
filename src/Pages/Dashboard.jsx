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

//REDUX
//bu sayfa lazyload yapılacak

function Dashboard() {
  //DECLARATIONS
  const modalRef = useRef();
  const dispatch = useDispatch();
  const auth = getAuth();

  //STATES
  let [userId, setUserId] = useState('');
  const [productsArray, setProductsArray] = useState([]);
  const [formState, setFormState] = useState({
    productTitle: '',
    productHaggle: false,
    productStock: 0,
    productOgPrice: 0,
    productSaleRate: 0,
  });

  // let allUsersProducts = useSelector((state) => state.user.userProducts);

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

  useEffect(() => {
    const q = query(productCollection, where('productOwner', '==', userId));

    const unsub = onSnapshot(q, (snapshot) => {
      let snapArray = snapshot.docs.map((doc) => doc.data());
      dispatch(SET_USER_PRODUCTS(snapArray));
      setProductsArray([...snapArray]);
    });

    return unsub;
  }, [userId]);

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
              <thead className='productTable-head'>
                <tr>
                  <td>Your Products</td>
                </tr>
              </thead>

              <tbody className='productTable-specs'>
                <tr>
                  <td>PRODUCT NAME</td>
                  <td>HANGLE</td>
                  <td>STOCK</td>
                  <td>ORIGINAL PRICE</td>
                  <td>SALE RATE</td>
                  <td>PRICE</td>

                  <td>
                    SEARCH
                    <input placeholder='Search product...' />
                  </td>
                </tr>
              </tbody>
              <tbody className='productTable-rows'>
                {productsArray.length > 0 &&
                  productsArray.map((product) => {
                    console.log('Product Array Güncellendi?', product);
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
            <div>ADD A NEW PRODUCT DIV</div>
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

export default Dashboard;
