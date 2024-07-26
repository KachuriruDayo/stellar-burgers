import { FC, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { orderBurgerApi, refreshToken } from '@api';
import { getCookie } from '../../utils/cookie';
import {
  getConstructorSelector,
  resetConstructor
} from '../../services/slices/burgerConstructorSlice';
import { getUserSelector } from '../../services/slices/userSlice';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const constructorItems = useSelector(getConstructorSelector);
  const userData = useSelector(getUserSelector);

  useEffect(() => {}, [orderRequest || orderModalData]);
  const onOrderClick = () => {
    if (
      !constructorItems.bun ||
      constructorItems.ingredients.length < 1 ||
      orderRequest
    ) {
      return;
    }

    if (!userData.isAuth) {
      navigate('/login');
      return;
    }

    if (!getCookie('accessToken')) {
      refreshToken();
    }

    const newOrder: string[] = [];
    newOrder.push(constructorItems.bun._id, constructorItems.bun._id);
    constructorItems.ingredients.map((ingredient) => {
      newOrder.push(ingredient._id);
    });
    setOrderRequest(true);

    orderBurgerApi(newOrder)
      .then((res) => {
        setOrderRequest(false);
        setOrderModalData(res.order);
        dispatch(resetConstructor());
      })
      .catch((res) => {
        setOrderRequest(false);
        console.log(res);
      });
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients
      ? constructorItems.ingredients.reduce(
          (s: number, v: TConstructorIngredient) => s + v.price,
          0
        )
      : 0;
    const price = bunPrice + ingredientsPrice;
    return price;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
