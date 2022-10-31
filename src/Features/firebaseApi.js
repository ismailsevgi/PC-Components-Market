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

import { v4 } from 'uuid';

import { toast } from 'react-toastify';

import {
  productsRef as productsCollection,
  usersRef as usersCollection,
  dataBase,
  usersRef,
} from '../DataBASE/firebase';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['products', 'users'],
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

      providesTags: ['products', 'users'],
    }),
    getUser: builder.query({
      //singleFetch
      async queryFn(id) {
        console.log('Gelen Id:', id);
        try {
          console.log('USER FETCH EDILIYOR');
          const userQuery = query(usersRef, where('id', '==', id));
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
          const q = query(usersCollection, where('id', '==', id));
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
      invalidatesTags: ['users'],
    }),
    //getBasketHere
    //basket
    setBasket: builder.mutation({
      //Kullanıcının sahip olduğu listeyi burada güncellemek lazım.
      //Gelen type'a göre işlemler yapılabilir
      queryFn({ id, basketList }) {
        console.log('setBasket: Gelen ID', id);
        console.log('setBasket: Gelen BasketList', basketList);
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
} = firebaseApi;
