import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import {
  moveElement,
  deleteElement
} from '../../services/slices/burgerConstructorSlice';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems, ...datcy }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () =>
      dispatch(moveElement({ direction: 'down', ingredient: ingredient }));

    const handleMoveUp = () =>
      dispatch(moveElement({ direction: 'up', ingredient: ingredient }));

    const handleClose = () => dispatch(deleteElement(ingredient));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        {...datcy}
      />
    );
  }
);
