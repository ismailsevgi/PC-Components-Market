import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
  tagTypes: ['products', 'users', 'favorites'],
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
          const userQuery = query(
            usersRef,
            where('userId', '==', localStorage.getItem('userId'))
          );
          let queryData = {};
          await getDocs(userQuery).then((userData) => {
            //after receiving the data, store inside queryData array
            userData?.forEach((doc) => {
              queryData = { ...doc.data() };
            });
          });

          //after all is done, data is sended
          console.log(queryData.userFavorites, 'queryData.userFavorites');
          return { data: queryData.userFavorites };
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
          //önce query ile users collection arasından user ı buldum
          //getDocs bana 1 tane user verdi query ye bağlı olarak
          //forEach ile dökümanın id sine ve dökümanın kendisine eriştim
          //gelen dökümanın içindeki fav list'i prevDoc olarak kayıt ettim
          //sonra bu item zaten listedemi değilmi diye kontrol ettim
          //eğer gelen listenin içinde ürün varsa sildim
          //yoksa ekledim

          console.log('Favoriye tıklandı');
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
          console.log('1');
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
        //Uygun ise upload işlemlerini yap
        //--order koleksiyonuna ekle > order koleksiyon id sini dökümana orderId olarak kayıt et > o "Id" yi aynı zamanda ürünü alan kişinin requests arrayine ekle, sonra ID yi ürün sahiplerine yollamanın yolunu bul..

        //ürün başarılı bir şekide her yere yüklendiğinde dashboard'da requests ve orders arraylerini query et.
        //Requestte kullanıcı ürünü iptal edebilir. eğer orderStatus'ü rejected'e çevir
        //Eğer bir sipariş rejected ise confirm / reject yerine [rejected by buyer] yazsın

        //order kısmındaki tabloda ürünün bilgileriyle birlikte 2 tane buton olur [confirm, reject]
        //eğer confirm yapılırsa, o sipariş numarasındaki ürün bulunur ve durumu "confirmed" yapılır
        //eğer rejected yapılırsa, ürün rejected yapılır

        //kullanıcı sipariş sayfasına giderek ürünlerin güncel durumu hakkında bilgi alabilir //new page

        //orderConstructor: taking a basketList an turning into a order document
        function orderConstructor(array) {
          return {
            orderId: 'non',
            orderStatus: 'continue',
            orderedBy: localStorage.getItem('userDocId'),
            productOwners: Array.from(
              new Set(array.map((product) => product.productOwner))
            ),
            products: [
              ...array
                .filter((product) => product.check && product)
                .map((product) => ({
                  id: product.id,
                  status: 'waiting',
                  quantity: product.quantity,
                  owner: product.productOwner,
                  totalPrice:
                    product.saleRate *
                    ((product.quantity * product.price) / 100),
                })),
            ],
          };
        }
        const order = orderConstructor(basketArray);

        try {
          await addDoc(ordersCollection, order)
            .then((orderRef) => {
              const documentRef = doc(ordersCollection, orderRef.id);
              //await is a must: fetching has to wait for update!!!
              updateDoc(documentRef, {
                orderId: orderRef.id,
                timestamp: serverTimestamp(),
              }).then(async () => {
                //dosyayı çek ve kayıt et
                let orderDoc = await getDoc(documentRef);
                let data = orderDoc.data();
                const customerRef = doc(usersCollection, data.orderedBy);
                let customerDoc = await getDoc(customerRef);
                let customerData = customerDoc.data();
                updateDoc(customerRef, {
                  basketOrders: [...customerData.basketOrders, data],
                });

                data.productOwners.forEach((sellerDocId) => {
                  console.log('Seller Request Aldı');
                  let sellerRef = doc(usersCollection, sellerDocId);
                  updateDoc(sellerRef, {
                    productRequests: [data],
                  });
                });
              });
            })
            .catch((err) =>
              console.log('Dosya etkenirken hata.., ', err.message)
            );

          return { data: 'ok' };
        } catch (error) {
          console.log('Something went wrong abicim...', error, error?.message);
          return { data: error };
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetProductQuery,
  useAddFavoritesMutation,
  useGetUserQuery,
  useSetBasketMutation,
  useGetBasketQuery,
  useGetFavoritesQuery,
  useSetOrderMutation,
} = firebaseApi;
