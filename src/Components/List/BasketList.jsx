import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersRef } from '../../DataBASE/firebase';
import { getUserBasket } from '../../Features/basketSlice';

//basket Buttons
import BasketButton from '../SubComponents/BasketButton';
import CheckButton from '../SubComponents/CheckButton';

function BasketList() {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  //If basket is empty program dispatch an action to get items from user's basket
  //If there is no item in user's basket nothing will change
  useEffect(() => {
    //eğer redux store yenileme ile basketItemlerini silmiş ise
    if (itemsInBasket.length < 1) {
      console.log('Baskette item yok, userdan fetch edilecek');
      const auth = getAuth();
      const unsubAuth = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Kullanıcı var, dispatch edildi');
          dispatch(getUserBasket('Gönderilen data!'));
        } else {
          console.log('Kullanıcı yok');
        }
      });

      unsubAuth();
    } else {
      console.log('Basket dolu, fetch etmeye gerek yok');
    }
  }, []);

  return (
    <div className='basketList'>
      {itemsInBasket &&
        itemsInBasket.map((item) => {
          return (
            <section className='basketItem'>
              <div className='basketItem-Left'>
                <CheckButton id={item.id} />

                <div className='basketItem-Left-Img'>
                  <img src={item.images[0]} />
                </div>
                <div className='basketItem-Left-Body'>
                  <div className='Body-Title'>
                    <h2>{item.title}</h2>

                    <span className='stockCounter'>
                      {item.stock > 10 ? (
                        <span className='inStock'>In Stock</span>
                      ) : (
                        <span className='onlyLeft'>Only left {item.stock}</span>
                      )}
                    </span>
                    <span>Seller: {'Guruhasan A.S.'}</span>
                    <span>
                      Delivery by Saturday, September 24 at the latest
                    </span>
                  </div>

                  <div className='Buttons'>
                    <div className='Buttons-PlusMin'>
                      <span>Quantity: </span>
                      {item.quantity > 1 ? (
                        <BasketButton
                          handle={'handleSub'}
                          icon={'Sub'}
                          id={item.id}
                        >
                          <i className='fa-solid fa-minus'></i>
                        </BasketButton>
                      ) : (
                        <BasketButton
                          handle={'handleDelete'}
                          icon={'Del'}
                          id={item.id}
                        >
                          <i className='fa-solid fa-trash-can'></i>
                        </BasketButton>
                      )}

                      <h3>{item.quantity}</h3>
                      <BasketButton
                        handle={'handleAdd'}
                        icon={'Add'}
                        id={item.id}
                      >
                        <i className='fa-solid fa-plus'></i>
                      </BasketButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className='basketItem-Right'>
                <h2>${item.price * item.quantity}</h2>
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default BasketList;
