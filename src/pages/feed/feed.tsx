import { useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/thunk/feeds';
import { getFeedsSelector } from '../../services/slices/feedsSlice';
import { FC } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const feedsData = useSelector(getFeedsSelector);
  const isLoading = feedsData.requestStatus !== 'Success' ? true : false;
  const orders: TOrder[] = feedsData.data.orders;

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />
      )}
    </>
  );
};
