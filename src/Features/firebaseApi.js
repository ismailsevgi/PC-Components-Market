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

import {
  productsRef as productsCollection,
  dataBase,
} from '../DataBASE/firebase';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn(id) {
        console.log('Yeniden Fetch Edildi!!!');
        try {
          const q = query(productsCollection, where('productOwner', '==', id));
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
      },
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),

      providesTags: ['products'],
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
            console.log('update başarılı!');
          });
          return { data: 'ok' };
        } catch (error) {
          return { data: error };
        }
      },

      invalidatesTags: ['products'],
    }),
    deleteProduct: builder.mutation({
      async queryFn(id) {
        console.log('Delete e gelen ID', id);
        try {
          const docRef = doc(productsCollection, id);

          await deleteDoc(docRef, id).then(() => {
            console.log('product deleted!');
          });
          return { data: 'ok' };
        } catch (error) {
          return { data: error };
        }
      },

      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = firebaseApi;
