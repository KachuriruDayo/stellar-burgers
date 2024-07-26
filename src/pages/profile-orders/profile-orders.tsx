import { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { getOrders } from '../../services/thunk/order';
import { useSelector, useDispatch } from '../../services/store';
import { getOrdersSelector } from '../../services/slices/orderSlice';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(getOrdersSelector);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orders: TOrder[] = data.userOrders;

  return <ProfileOrdersUI orders={orders} />;
};
