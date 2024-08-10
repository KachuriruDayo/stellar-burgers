import { Login } from './../../../pages/login/login';
import { userSlice } from "../userSlice";
import { RequestStatus } from "../../../utils/types";
import { getCookie } from "../../../utils/cookie";
import { getUser, loginUser, updateUser, registerUser, logout } from "../../thunk/user";

const initialState = {
  userData: {
    name: '',
    email: ''
  },
  isAuth: false,
  requestStatus: RequestStatus.Idle

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
      isAuth: true,
      requestStatus: RequestStatus.Success
    }

    const actualState = userReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getUser.fulfilled(testData, '')
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to Loading by getUser pending',() => {
    const referenceState = {
      userData: initialState.userData,
      isAuth: false,
      requestStatus: RequestStatus.Loading
    }

    const actualState = userReducer(
      {
        ...initialState
      },
      getUser.pending('')
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to failed by getUser rejected',() => {
    const referenceState = {
      userData: initialState.userData,
      isAuth: false,
      requestStatus: RequestStatus.Failed
    }

    const actualState = userReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getUser.rejected(Error('403'),'')
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
      isAuth: true,
      requestStatus: RequestStatus.Success
    }

    const actualState = userReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      loginUser.fulfilled(testData, '', mockLoginUser)
    );
    
    expect(actualState).toEqual(referenceState);
    expect(localStorage.getItem('refreshToken')).toBe(mockRefreshToken);
    expect(getCookie('accessToken')).toBe(mockAccessToken);
  });

  it('should toggle requestStatus to Loading by loginUser pending',() => {
    const referenceState = {
      userData: initialState.userData,
      isAuth: false,
      requestStatus: RequestStatus.Loading
    }

    const actualState = userReducer(
      {
        ...initialState
      },
      loginUser.pending('', mockLoginUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to failed by loginUser rejected',() => {
    const referenceState = {
      userData: initialState.userData,
      isAuth: false,
      requestStatus: RequestStatus.Failed
    }

    const actualState = userReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      loginUser.rejected(Error('403'),'',mockLoginUser)
    );
    
    expect(actualState).toEqual(referenceState);
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
      isAuth: true,
      requestStatus: RequestStatus.Success
    }

    const actualState = userReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      registerUser.fulfilled(testData, '', mockRegisterUser)
    );
    
    expect(actualState).toEqual(referenceState);
    expect(localStorage.getItem('refreshToken')).toBe(mockRefreshToken);
    expect(getCookie('accessToken')).toBe(mockAccessToken);
  });

  it('should toggle requestStatus to Loading by registerUser pending',() => {
    const referenceState = {
      userData: initialState.userData,
      isAuth: false,
      requestStatus: RequestStatus.Loading
    }

    const actualState = userReducer(
      {
        ...initialState
      },
      registerUser.pending('', mockRegisterUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to Failed by registerUser rejected',() => {
    const referenceState = {
      userData: initialState.userData,
      isAuth: false,
      requestStatus: RequestStatus.Failed
    }

    const actualState = userReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      registerUser.rejected(Error('403'),'', mockRegisterUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should get new userData at update and add it in state',() => {
    const testData = {
      user: mockUpdateUser,
      success: true
    }

    const referenceState = {
      userData: mockUpdateUser,
      isAuth: true,
      requestStatus: RequestStatus.Success
    }

    const actualState = userReducer(
      {
        userData: mockDefaultUser,
        isAuth: true,
        requestStatus: RequestStatus.Loading
      },
      updateUser.fulfilled(testData, '', mockUpdateUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to Loading by updateUser pending',() => {
    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true,
      requestStatus: RequestStatus.Loading
    }

    const actualState = userReducer(
      {
        userData: mockDefaultUser,
        isAuth: true,
        requestStatus: RequestStatus.Success
      },
      updateUser.pending('', mockUpdateUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to Failed by updateUser rejected',() => {
    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true,
      requestStatus: RequestStatus.Failed
    }

    const actualState = userReducer(
      {
        userData: mockDefaultUser,
        isAuth: true,
        requestStatus: RequestStatus.Loading
      },
      updateUser.rejected(Error('403'),'', mockUpdateUser)
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should clear userData and clear all Tokens',() => {

    const actualState = userReducer(
      {
        userData: mockDefaultUser,
        isAuth: true,
        requestStatus: RequestStatus.Loading
      },
      logout.fulfilled({success: true}, '')
    );
    
    expect(actualState).toEqual(initialState);
    expect(localStorage.getItem('refreshToken')).toBe(null);
    expect(getCookie('accessToken')).toBe(undefined);
  });

  it('should toggle requestStatus to Loading by logout pending',() => {
    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true,
      requestStatus: RequestStatus.Loading
    }

    const actualState = userReducer(
      {
        userData: mockDefaultUser,
        isAuth: true,
        requestStatus: RequestStatus.Success
      },
      logout.pending('')
    );
    
    expect(actualState).toEqual(referenceState);
  });

  it('should toggle requestStatus to Failed by logout rejected',() => {
    const referenceState = {
      userData: mockDefaultUser,
      isAuth: true,
      requestStatus: RequestStatus.Failed
    }

    const actualState = userReducer(
      {
        userData: mockDefaultUser,
        isAuth: true,
        requestStatus: RequestStatus.Loading
      },
      logout.rejected(Error('403'),'')
    );
    
    expect(actualState).toEqual(referenceState);
  });
});
