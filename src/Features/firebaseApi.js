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
  tagTypes: ['products', 'users', 'favorites', 'order', 'basket'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      //type:"userDashboard" payload:userId
      //type:"filter" payload: label
      async queryFn({ type, label }) {
        console.log('type, label: ', type, label);

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
          console.log('Type filtering');
          if (label === 'all') {
            console.log('Type all');
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
            console.log('Type else');
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

        if (type === 'custom') {
          console.log('type custom: ', type, label);
          try {
            const q = query(
              productsCollection,
              where('searchQueries', 'array-contains', label.toLowerCase())
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
            console.log('Error: ', error);
            return { data: error };
          }
        }

        if (type === 'favorites') {
          //favorites , userDocId
          console.log('type custom: ', type, label);
          try {
            const userRef = doc(usersCollection, label);

            const userDoc = await getDoc(userRef);
            const userFavs = await userDoc.data().userFavorites;
            const promise = [];
            for (const proId of userFavs) {
              let productRef = doc(productsCollection, proId);

              promise.push((await getDoc(productRef)).data());
            }

            return { data: promise };
          } catch (error) {
            console.log('Error: ', error);
            return { data: error };
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
      async queryFn({ values, productType, country, city }) {
        try {
          console.log(
            "...values.title.split(' ').toLowerCase():",
            ...values.title.toLowerCase().split(' ')
          );
          await addDoc(productsCollection, {
            ...values,
            tag: productType,
            searchQueries: [
              values.brand.toLowerCase(),
              values.city.value.toLowerCase(),
              values.country.value.toLowerCase(),
              values.tag,
              ...values.title.toLowerCase().split(' '),
            ],

            country: country.value,
            city: city.value,
            sellerEmail: localStorage.getItem('userEmail'),
            sellerUsername: localStorage.getItem('userName'),
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
          console.log('Ürün Eklenemedi: ', error);
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
          return { data: 'error' };
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
            const userDocRef = doc(usersCollection, document.id);

            if (!prevDoc.userFavorites.includes(url)) {
              updateDoc(userDocRef, {
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
                updateDoc(userDocRef, {
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

    getBasket: builder.query({
      async queryFn() {
        //from localStorage query gets userId to find userDocument

        const userDocRef = doc(
          usersCollection,
          localStorage.getItem('userDocId')
        );
        let userDoc = await getDoc(userDocRef);

        try {
          return { data: userDoc.data().userBasket };
        } catch (error) {
          console.log('Error', error.message);
          return { data: 'error' };
        }
      },
      providesTags: ['basket'],
    }),

    setBasket: builder.mutation({
      async queryFn({ type, product, productId, stock }) {
        console.log('Gelen ProductId: ', productId);
        console.log('Gelen type: ', type);
        console.log('Gelen stock: ', stock);

        try {
          const userDocRef = doc(
            usersCollection,
            localStorage.getItem('userDocId')
          );
          const userDoc = await getDoc(userDocRef);
          let check = userDoc.data().userBasket.find((product) => {
            console.log('product.id', product.id);
            console.log('productId', productId);
            return product.id === productId;
          });

          switch (type) {
            case 'add':
              console.log('Product Checking...');

              if (check) {
                console.log(
                  'check.quantity den gelen product: ',
                  check.quantity
                );
                console.log('product.stock den gelen product: ', product.stock);
                //stock check

                if (product.stock - check.quantity <= 0) {
                  toast.error("You can't add more!;exceeding stocksize");
                } else {
                  console.log('There is a product, so increase it');
                  updateDoc(userDocRef, {
                    ...userDoc.data(),
                    userBasket: [
                      ...userDoc.data().userBasket.map((product) => {
                        if (product.id === productId) {
                          return {
                            ...product,
                            quantity: (product.quantity += 1),
                          };
                        } else {
                          return product;
                        }
                      }),
                    ],
                  });
                }
              }

              if (!check) {
                console.log('There is no product, so adding it');
                updateDoc(userDocRef, {
                  ...userDoc.data(),
                  userBasket: [...userDoc.data().userBasket, product],
                });
              }

              break;

            case 'increase':
              console.log("Product's quantity increased...");
              if (stock - check.quantity <= 0) {
                toast.error("You can't add more!;exceeding stocksize");
              } else {
                updateDoc(userDocRef, {
                  ...userDoc.data(),
                  userBasket: [
                    ...userDoc.data().userBasket.map((product) => {
                      if (product.id === productId) {
                        return {
                          ...product,
                          quantity: (product.quantity += 1),
                        };
                      } else {
                        return product;
                      }
                    }),
                  ],
                });
              }

              break;

            case 'decrease':
              console.log("Product's quantity decreased...");

              updateDoc(userDocRef, {
                ...userDoc.data(),
                userBasket: [
                  ...userDoc.data().userBasket.map((product) => {
                    if (product.id === productId) {
                      return {
                        ...product,
                        quantity: (product.quantity -= 1),
                      };
                    } else {
                      return product;
                    }
                  }),
                ],
              });
              break;

            case 'delete':
              console.log('Product is deleted...');
              updateDoc(userDocRef, {
                ...userDoc.data(),
                userBasket: [
                  ...userDoc
                    .data()
                    .userBasket.filter((product) => product.id !== productId),
                ],
              });
              break;

            case 'check':
              console.log('Product is checked...');

              updateDoc(userDocRef, {
                ...userDoc.data(),
                userBasket: [
                  ...userDoc.data().userBasket.map((product) => {
                    if (product.id === productId) {
                      return {
                        ...product,
                        check: !product.check,
                      };
                    } else {
                      return product;
                    }
                  }),
                ],
              });
              break;
          }
          return { data: 'ok' };
        } catch (error) {
          toast.error('Something went wrong: setBasket');
          console.log(error, error.message);
          return { data: error };
        }
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
            console.log('userDocument.data():', userDocument.data());
            let orderRef = doc(ordersCollection, orderId);
            let orderDoc = await getDoc(orderRef);
            console.log('orderDoc', orderDoc);
            for (const order of orderDoc.data().products) {
              console.log('order', order);
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
          let productDocRef = doc(productsCollection, productId);
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

                // let oldProductDocument = await getDoc(orderDocRef);
                // console.log(oldProductDocument.data().stock, product.quantity);
                // updateDoc(productDocRef, {
                //   ...oldProductDocument.data(),
                //   stock: oldProductDocument.data().stock - product.quantity,
                // });
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
