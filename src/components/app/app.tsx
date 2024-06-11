import { Routes, Route } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { getIngredientsApi, getFeedsApi } from '../../utils/burger-api';
import { ProtectedRoute} from './ProtectedRoute';

import { AppHeader, Modal } from '@components';

const App = () => {
  const unlockSecurePath: boolean = false;

  console.log(getIngredientsApi());
  console.log(getFeedsApi());

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path='feed' element={<Feed />} />
          <Route element={<ProtectedRoute unlockSecurePath={unlockSecurePath} />}>
            <Route path='profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
