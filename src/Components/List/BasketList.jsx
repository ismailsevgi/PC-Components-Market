import React, { useEffect } from 'react';

//basket Buttons
import BasketButton from '../SubComponents/BasketButton';
import CheckButton from '../SubComponents/CheckButton';

import emptyCart from '../../Images/empty-cart.png';

const BasketList = ({ itemsInBasket, userStatus }) => {
  useEffect(() => {
    console.log('basketList: ', itemsInBasket);
  }, [itemsInBasket]);

  return (
    <div className='basketList'>
      {itemsInBasket && itemsInBasket.length > 0 ? (
        itemsInBasket?.map((item) => {
          return (
            <section key={item.id} className='basketItem'>
              <div className='basketItem-Left'>
                <CheckButton id={item.id} />

                <div className='basketItem-Left-Img'>
                  <img src={item.images[0]} />
                </div>
                <div className='basketItem-Left-Body'>
                  <div className='Body-Title'>
                    <h2>{item.title.slice(0, 30)}</h2>

                    <span className='stockCounter'>
                      {item.stock > 10 ? (
                        <span className='inStock'>In Stock</span>
                      ) : (
                        <span className='onlyLeft'>Only left {item.stock}</span>
                      )}
                    </span>
                    <span>Seller: {item.sellerUsername}</span>
                  </div>
                </div>
              </div>

              <div className='basketItemCardVersion'>
                <div className='imageWrapper'>
                  <img src={item.images[0]} />
                </div>
                <h2>{item.title.slice(0, 30)}</h2>
                <p>Seller: {item.sellerUsername}</p>
                <p>Location: {`${item.country} ${item.city}`}</p>
                <h2>Price: ${item.price * item.quantity}</h2>

                <hr></hr>
                <div className='Buttons-PlusMin'>
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

                  <p>{item.quantity}</p>
                  <BasketButton
                    handle={'handleAdd'}
                    icon={'Add'}
                    id={item.id}
                    stock={item.stock}
                  >
                    <i className='fa-solid fa-plus'></i>
                  </BasketButton>
                </div>
              </div>

              <div className='basketItem-Right'>
                <div className='priceDiv'>
                  <h2>${item.price * item.quantity}</h2>
                </div>
                <div className='Buttons'>
                  <div className='Buttons-PlusMin'>
                    <BasketButton
                      handle={'handleAdd'}
                      icon={'Add'}
                      id={item.id}
                      stock={item.stock}
                    >
                      <i className='fa-solid fa-plus'></i>
                    </BasketButton>

                    <h3>{item.quantity}</h3>
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
                  </div>
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <div className='imageWrapper'>
          <img src={emptyCart} />
          <p>Opps. Your cart is empty!</p>
        </div>
      )}
    </div>
  );
};

export default BasketList;
