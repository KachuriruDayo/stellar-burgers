import { userSlice } from "../slices/userSlice";
import { getCookie } from "../../utils/cookie";
import { getUser, loginUser, updateUser, registerUser, logout } from "../thunk/user";

const initialState = {
  userData: {
    name: '',
    email: ''
  },
  isAuth: false
};

const userReducer = userSlice.reducer;

const mockRegisterUser = {
  name: 'Ivan',
  email: 'ivan@mail.ru',
  password: 'hsr3us37hd'
}
const mockLoginUser = {
  email: 'ivan@mail.ru',
  password: 'hsr3us37hd'
}

const mockDefaultUser = {
  name: 'Ivan',
  email: 'ivan@mail.ru'
}

const mockUpdateUser = {
  name: 'Ivan1',
  email: 'ivan23@mail.ru'
}

const mockRefreshToken = 'refreshToken';

const mockAccessToken = 'accessToken';


describe('userSlice test',() => {

  it('should get userData and add it in state, and isAuth toggle true',() => {
    const testData = {
      user: mockDefaultUser,
      success: true
    }

    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true
    }

    const actualState = userReducer(
      {
        ...initialState
      },
      getUser.fulfilled(testData, '')
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should get userData at login and add it in state, and isAuth toggle true',() => {
    const testData = {
      refreshToken: mockRefreshToken,
      accessToken: mockAccessToken,
      user: mockDefaultUser,
      success: true
    }

    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true
    }

    const actualState = userReducer(
      {
        ...initialState
      },
      loginUser.fulfilled(testData, '', mockLoginUser)
    );
    
    expect(actualState).toEqual(referenceState);
    expect(localStorage.getItem('refreshToken')).toBe(mockRefreshToken);
    expect(getCookie('accessToken')).toBe(mockAccessToken);
  });

  it('should get userData at register and add it in state, and isAuth toggle true',() => {
    const testData = {
      refreshToken: mockRefreshToken,
      accessToken: mockAccessToken,
      user: mockDefaultUser,
      success: true
    }

    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true
    }

    const actualState = userReducer(
      {
        ...initialState
      },
      registerUser.fulfilled(testData, '', mockRegisterUser)
    );
    
    expect(actualState).toEqual(referenceState);
    expect(localStorage.getItem('refreshToken')).toBe(mockRefreshToken);
    expect(getCookie('accessToken')).toBe(mockAccessToken);
  });

  it('should get new userData at update and add it in state',() => {
    const testData = {
      user: mockUpdateUser,
      success: true
    }

    const referenceState = {
      userData: mockUpdateUser,
      isAuth: true
    }

    const actualState = userReducer(
      {
        ...initialState,
        isAuth: true
      },
      updateUser.fulfilled(testData, '', mockUpdateUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should clear userData and clear all Tokens',() => {

    const actualState = userReducer(
      {
        ...initialState,
        isAuth: true
      },
      logout.fulfilled({success: true}, '')
    );
    
    expect(actualState).toEqual(initialState);
    expect(localStorage.getItem('refreshToken')).toBe(null);
    expect(getCookie('accessToken')).toBe(undefined);
  });
});
