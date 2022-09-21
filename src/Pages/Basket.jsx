import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BasketButton from '../Components/SubComponents/BasketButton';

function Basket() {
  const itemsInBasket = useSelector((state) => {
    return state.basket.basketItems;
  });

  console.log('itemsInBasket: ', itemsInBasket);

  return (
    <div className='basket'>
      <div className='basketNav'>
        <div className='basketNav-Title'>
          <h1>Shopping Basket</h1>
          <p>Delete all items</p>
        </div>
        <span>Price</span>
      </div>

      <div className='container'>
        <div className='basketList'>
          {itemsInBasket &&
            itemsInBasket.map((item) => {
              return (
                <section className='basketItem'>
                  <div className='basketItem-Left'>
                    <input
                      type='checkbox'
                      class='onoffswitch-checkbox'
                      value={'checked'}
                    />
                    <div className='basketItem-Left-Img'>
                      <img src={item.img} />
                    </div>
                    <div className='basketItem-Left-Body'>
                      <div className='Body-Title'>
                        <h2>
                          {item.title}:{item.specs.Memory}{' '}
                          {item.specs['GPU clock']} {item.specs.Memory}{' '}
                          {item.specs['Memory clock']}
                        </h2>

                        <span className='stockCounter'>
                          {item.stock > 10 ? (
                            <span className='inStock'>In Stock</span>
                          ) : (
                            <span className='onlyLeft'>
                              Only left {item.stock}
                            </span>
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
                              <i class='fa-solid fa-minus'></i>
                            </BasketButton>
                          ) : (
                            <BasketButton
                              handle={'handleDelete'}
                              icon={'Del'}
                              id={item.id}
                            >
                              <i class='fa-solid fa-trash-can'></i>
                            </BasketButton>
                          )}

                          <h3>{item.quantity}</h3>
                          <BasketButton
                            handle={'handleAdd'}
                            icon={'Add'}
                            id={item.id}
                          >
                            <i class='fa-solid fa-plus'></i>
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
        <div className='payment'>payment</div>
      </div>
    </div>
  );
}

export default Basket;
