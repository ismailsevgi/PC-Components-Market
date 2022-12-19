import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetBasketQuery } from '../../Features/firebaseApi';

function OnlineBasketBadge() {
  const { data, error, isFetching, isError } = useGetBasketQuery();

  useEffect(() => {}, [isFetching]);

  useEffect(() => {
    isError && toast.error("Basket couldn't fetched");
  }, [isError]);

  return (
    <span className='badge'>
      <p>{data ? data.length : 0}</p>
    </span>
  );
}

export default OnlineBasketBadge;
