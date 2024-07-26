import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice';
import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { Preloader } from '../../components/ui/preloader/preloader';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  let data = useSelector(getIngredientsSelector);
  const isLoading = data.requestStatus !== 'Success' ? true : false;

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
