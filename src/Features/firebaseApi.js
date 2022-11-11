import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { toast } from 'react-toastify';
import useOrderConstructor from '../CustomHooks/useOrderConstructor';

import {
  productsRef as productsCollection,
  usersRef as usersCollection,
  ordersRef as ordersCollection,
  dataBase,
  usersRef,
} from '../DataBASE/firebase';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['products', 'users', 'favorites', 'order'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      //type:"userDashboard" payload:userId
      //type:"filter" payload: label
      async queryFn({ type, label }) {
        if (type === 'userProducts') {
          //if there is an userid then query fetch user's products
          if (label) {
            try {
              const q = query(
                productsCollection,
                where('productOwner', '==', label)
              );
              const querySnapshot = await getDocs(q);
              let productsData = [];

              querySnapshot?.forEach((doc) => {
                productsData.push({
                  id: doc.id,
                  ...doc.data(),
                });
              });
              return { data: productsData };
            } catch (error) {
              return { data: error };
            }
          }
        }

        if (type === 'filtering') {
          if (label === 'all') {
            try {
              const querySnapshot = await getDocs(productsCollection);

              let productsData = [];

              querySnapshot?.forEach((doc) => {
                productsData.push({
                  id: doc.id,
                  ...doc.data(),
                });
              });

              return { data: productsData };
            } catch (error) {
              return { data: error };
            }
          } else {
            let filterQuery = query(
              productsCollection,
              where('tag', '==', label)
            );

            try {
              const querySnapshot = await getDocs(filterQuery);

              let productsData = [];

              querySnapshot?.forEach((doc) => {
                productsData.push({
                  id: doc.id,
                  ...doc.data(),
                });
              });

              return { data: productsData };
            } catch (error) {
              return { data: error };
            }
          }
        }
      },
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),

      providesTags: ['products', 'users', 'basket'],
    }),
    getUser: builder.query({
      //singleFetch
      async queryFn(id) {
        try {
          const userQuery = query(
            usersRef,
            where('userId', '==', localStorage.getItem('userId'))
          );
          let queryData = [];
          await getDocs(userQuery).then((userData) => {
            //after receiving the data, store inside queryData array
            userData?.forEach((doc) => {
              queryData.push({ id: doc.id, ...doc.data() });
            });
          });

          //after all is done, data is sended
          return { data: queryData };
        } catch (error) {
          console.log('Bilgi Alınamadı');
          return { data: error };
        }
      },
      providesTags: ['users', 'products'],
    }),
    getProduct: builder.query({
      //singleFetch
      async queryFn(id) {
        try {
          let productQuery = doc(productsCollection, id);
          let product = await getDoc(productQuery);
          return { data: product.data() };
        } catch (error) {
          return { data: error };
        }
      },
      providesTags: ['products', 'users'],
    }),
    updateProduct: builder.mutation({
      async queryFn({ id, formData }) {
        try {
          const docRef = doc(productsCollection, id);
          //await is a must: fetching has to wait for update!!!
          await updateDoc(docRef, {
            ...formData,
            timestamp: serverTimestamp(),
          }).then(() => {
            toast.success('Update Başarılı');
          });
          return { data: 'ok' };
        } catch (error) {
          toast.error('Something went wrong: ', error);
          return { data: error };
        }
      },

      invalidatesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      async queryFn(id) {
        try {
          const docRef = doc(productsCollection, id);

          await deleteDoc(docRef, id).then(() => {
            toast.success('Product Deleted!');
          });
          return { data: 'ok' };
        } catch (error) {
          return { data: error };
        }
      },

      invalidatesTags: ['products'],
    }),
    addProduct: builder.mutation({
      async queryFn({ values, productType }) {
        try {
          await addDoc(productsCollection, {
            ...values,
            tag: productType,
          }).then((docRef) => {
            const documentRef = doc(productsCollection, docRef.id);
            //await is a must: fetching has to wait for update!!!
            updateDoc(documentRef, {
              id: docRef.id,
              timestamp: serverTimestamp(),
            });
          });
          return { data: 'ok' };
        } catch (error) {
          return { data: error };
        }
      },
      invalidatesTags: ['products'],
    }),

    getFavorites: builder.query({
      async queryFn() {
        try {
          const userDoc = doc(
            usersCollection,
            localStorage.getItem('userDocId')
          );

          let userDocument = await getDoc(userDoc);

          return { data: userDocument.data().userFavorites };
        } catch (error) {
          console.log('Favoriler Çekilemedi');
          return { data: error };
        }
      },
      providesTags: ['favorites'],
    }),

    addFavorites: builder.mutation({
      async queryFn({ id, url }) {
        try {
          const q = query(usersCollection, where('userId', '==', id));
          let user = await getDocs(q);

          user?.forEach((document) => {
            let prevDoc = document.data();
            const userRef = doc(usersCollection, document.id);

            if (!prevDoc.userFavorites.includes(url)) {
              updateDoc(userRef, {
                userFavorites: [...prevDoc.userFavorites, url],
              });
              //dispatch goes here
              toast.success('Product Added successfully');

              return { data: 'true' };
            } else {
              let prevDoc = document.data();
              let indexOfProduct = prevDoc.userFavorites.indexOf(url);

              //favoriden çıkarılan hariç hepsi siliniyor
              prevDoc.userFavorites.splice(indexOfProduct, 1),
                updateDoc(userRef, {
                  userFavorites: prevDoc.userFavorites,
                });

              toast.info('Product deleted from fav list successfully');
              return { data: 'false' };
            }
          });
          return { data: 'ok' };
        } catch (error) {
          toast.error("Product couldn't add into favorites!, try again later.");

          return { data: error };
        }
      },
      invalidatesTags: ['favorites'],
    }),
    //getBasketHere
    getBasket: builder.query({
      async queryFn() {
        //from localStorage query gets userId to find userDocument
        const userQuery = query(
          usersRef,
          where('userId', '==', localStorage.getItem('userId'))
        );
        let userBasketData = [];
        try {
          await getDocs(userQuery).then((userDocument) => {
            userDocument.forEach((dc) => {
              const userData = dc.data();

              userBasketData.push(...userData.userBasket);
            });
          });

          return { data: userBasketData };
        } catch (error) {
          console.log('Error', error.message);
          return { data: error };
        }
      },
      providesTags: ['basket'],
    }),
    //basket
    setBasket: builder.mutation({
      async queryFn({ type, product, productId }) {
        console.log('TYPE ', type, 'PRODUCT ', product);

        try {
          const q = query(
            usersCollection,
            where('userId', '==', localStorage.getItem('userId'))
          );
          let user = await getDocs(q);
          console.log('user: ', user);
          user?.forEach((document) => {
            console.log('User: document.id: ', document.id);
            let prevDoc = document.data();
            const userRef = doc(usersCollection, document.id);

            console.log('prevDoc: ', prevDoc);

            let oldProduct = prevDoc.userBasket.find(
              (obj) => obj.id === productId
            );

            let newBasket = prevDoc.userBasket.filter(
              (obj) => obj.id !== productId
            );

            switch (type) {
              case 'add':
                console.log('Product Added...');
                updateDoc(userRef, {
                  ...document.data(),
                  userBasket: [...prevDoc.userBasket, product],
                });
                break;

              case 'increase':
                console.log("Product's quantity increased...");
                oldProduct.quantity = oldProduct.quantity += 1;

                updateDoc(userRef, {
                  ...document.data(),
                  userBasket: [...newBasket, oldProduct],
                });

                break;

              case 'decrease':
                console.log("Product's quantity decreased...");
                oldProduct.quantity = oldProduct.quantity -= 1;

                updateDoc(userRef, {
                  ...document.data(),
                  userBasket: [...newBasket, oldProduct],
                });
                break;

              case 'delete':
                console.log('Product is deleted...');
                updateDoc(userRef, {
                  ...document.data(),
                  userBasket: [...newBasket],
                });
                break;

              case 'check':
                console.log('Product is checked...');
                oldProduct.check = !oldProduct.check;

                updateDoc(userRef, {
                  ...document.data(),
                  userBasket: [...newBasket, oldProduct],
                });
                break;
            }
          });
        } catch (error) {
          toast.error('Something went wrong: setBasket');
          console.log(error, error.message);
          return { data: error };
        }

        return { data: 'ok' };
      },
      invalidatesTags: ['basket'],
    }),
    setOrder: builder.mutation({
      async queryFn(basketArray) {
        //order kısmındaki tabloda ürünün bilgileriyle birlikte 2 tane buton olur [confirm, reject]
        //eğer confirm yapılırsa, o sipariş numarasındaki ürün bulunur ve durumu "confirmed" yapılır
        //eğer rejected yapılırsa, ürün rejected yapılır

        //kullanıcı sipariş sayfasına giderek ürünlerin güncel durumu hakkında bilgi alabilir //new page

        //orderConstructor: look inside useOrderConstructor custom hook.

        const order = useOrderConstructor(basketArray);
        let orderId = '';
        try {
          await addDoc(ordersCollection, order)
            .then((orderRef) => {
              //After adding the order inside orderCollection, order document has to have the same id as well as its document id in order to find and update more easily.

              const documentRef = doc(ordersCollection, orderRef.id);
              orderId = orderRef.id;
              //documentRef: uploaded order document's ref.

              //uploadDoc: adds orderId property with value of documents id. (orderRef.id == firebaseDocId)

              updateDoc(documentRef, {
                orderId: orderRef.id,
                date: new Date(),
                timestamp: serverTimestamp(),
              }).then(async () => {
                //After updating with getDoc method one can reach updated orderDoc.
                let orderDoc = await getDoc(documentRef);
                let data = orderDoc.data();

                //---------------------------------

                //Reaching the customer's document who buys the products to add the orderDoc inside its orders array
                const customerRef = doc(usersCollection, data.orderedBy);
                let customerDoc = await getDoc(customerRef);
                let customerData = customerDoc.data();

                updateDoc(customerRef, {
                  orders: [...customerData.orders, data.orderId],
                  userBasket: [],
                });

                //----------------------------
                //reaching the seller's doc one by one with forEach method to add orderDoc inside their requestedProducts array.

                await data.productOwners.forEach((sellerDocId) => {
                  console.log('Seller Request Aldı');
                  let sellerRef = doc(usersCollection, sellerDocId);
                  updateDoc(sellerRef, {
                    productRequests: [data.orderId],
                  });
                });
                //------------------------------------
              });
            })
            .catch((err) =>
              console.log('Dosya etkenirken hata.., ', err.message)
            );

          return { data: orderId };
        } catch (error) {
          console.log('Something went wrong abicim...', error, error?.message);
          return { data: error };
        }
      },
      invalidatesTags: ['order'],
    }),
    getOrder: builder.query({
      //the page after giving the order
      async queryFn(orderId) {
        try {
          const orderRef = doc(ordersCollection, orderId);

          let orderData = await getDoc(orderRef);
          return { data: orderData.data() };
        } catch (error) {
          return { data: error };
        }
      },
      providesTags: ['order'],
    }),
    getUsersOrders: builder.query({
      async queryFn(userDocId) {
        try {
          const userDocRef = query(
            ordersCollection,
            where('orderedBy', '==', userDocId)
          );
          let userData = [];
          await getDocs(userDocRef).then((doc) => {
            doc.forEach((data) => {
              userData.push(data.data());
            });
          });

          return { data: userData };
        } catch (error) {
          return { data: error };
        }
      },
      providesTags: ['order'],
    }),
    updateOrder: builder.mutation({
      async queryFn({ type, orderId }) {
        console.log('Gelen Type:', type, ' Gelen orderıd: ', orderId);
        try {
          const orderRef = doc(ordersCollection, orderId);

          updateDoc(orderRef, {
            orderStatus: 'canceled',
          });
          return { data: 'ok' };
        } catch (error) {
          return { data: error };
        }
      },
      invalidatesTags: ['order'],
    }),
    getProductRequests: builder.query({
      async queryFn(id) {
        try {
          let userDocRef = doc(usersCollection, id);

          let userDocument = await getDoc(userDocRef);
          let filteredOrders = [];

          for (const orderId of userDocument.data().productRequests) {
            let orderRef = doc(ordersCollection, orderId);
            let orderDoc = await getDoc(orderRef);

            for (const order of orderDoc.data().products) {
              if (order.owner == id) {
                filteredOrders.push({
                  ...order,
                  date: orderDoc.data().date,
                  orderId: orderId,
                });
              }
            }
          }

          return {
            data: filteredOrders,
          };
        } catch (error) {
          return { data: error };
        }
      },
      providesTags: ['order'],
    }),
    handleProductRequests: builder.mutation({
      async queryFn({ type, orderId, productId }) {
        console.log('işlenen: ', type, orderId, productId);
        try {
          let orderDocRef = doc(ordersCollection, orderId);

          let orderDoc = await getDoc(orderDocRef);

          for (const product of orderDoc.data().products) {
            if (product.id === productId) {
              console.log('Product Bulundu: ', product);
              if (type === 'reject') {
                updateDoc(orderDocRef, {
                  products: [
                    ...orderDoc.data().products.map((obj) => {
                      if (obj.id === productId) {
                        return { ...obj, status: 'rejected' };
                      } else {
                        return obj;
                      }
                    }),
                  ],
                });
              }

              if (type === 'confirm') {
                updateDoc(orderDocRef, {
                  products: [
                    ...orderDoc.data().products.map((obj) => {
                      if (obj.id === productId) {
                        return { ...obj, status: 'confirmed' };
                      } else {
                        return obj;
                      }
                    }),
                  ],
                });
              }
            }
          }

          return { data: 'ok' };
        } catch (error) {
          return { data: error };
        }
      },
      invalidatesTags: ['order'],
    }),
  }),
});

//userFuns
export const { useGetUserQuery } = firebaseApi;

//basketFuns
export const { useGetBasketQuery, useSetBasketMutation } = firebaseApi;

//Product Funs
export const {
  useGetProductQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = firebaseApi;

//Favorite Funs
export const { useGetFavoritesQuery, useAddFavoritesMutation } = firebaseApi;

//Order Funs
export const {
  useGetOrderQuery,
  useGetUsersOrdersQuery,
  useSetOrderMutation,
  useUpdateOrderMutation,
  useGetProductRequestsQuery,
  useHandleProductRequestsMutation,
} = firebaseApi;
