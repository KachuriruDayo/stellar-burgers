import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getFeedsSelector } from '../../services/slices/feedsSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feedsData = useSelector(getFeedsSelector);
  /** TODO: взять переменные из стора */
  const orders: TOrder[] = feedsData.data.orders;
  const feed = {
    total: feedsData.data.total,
    totalToday: feedsData.data.totalToday
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
