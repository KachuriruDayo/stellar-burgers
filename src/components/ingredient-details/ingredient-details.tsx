import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const data = useSelector(getIngredientsSelector);
  const ingredientId = useParams<{ id: string }>();
  /** TODO: взять переменную из стора */
  const ingredientData = data.ingredients.find(
    (ingredient) => ingredient._id === ingredientId.id
  );

  return (
    <>
      {!ingredientData ? (
        <Preloader />
      ) : (
        <IngredientDetailsUI ingredientData={ingredientData} />
      )}
    </>
  );
};
