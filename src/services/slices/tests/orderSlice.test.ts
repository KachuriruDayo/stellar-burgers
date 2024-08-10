import { getOrderByNumber, getOrders } from "../../thunk/order";
import { ordersSlice } from "../orderSlice";
import { RequestStatus } from "../../../utils/types";

const ordersReducer = ordersSlice.reducer;

const initialState = {
  userOrders: [],
  userOrdersRequest: RequestStatus.Idle,
  orderByNum: undefined,
  orderByNumRequest: RequestStatus.Idle
};

const mockRequestData = [
    {
      _id: 'sue43j67jys9iekg',
      status: 'done',
      name: 'Dave',
      createdAt: 'morning',
      updatedAt: 'noon',
      number: 43256,
      ingredients: ['id64582','id725245']
    }
  ]

const mockOrderData = {
  _id: 'sue43j67jys9iekg',
      status: 'done',
      name: 'Dave',
      createdAt: 'morning',
      updatedAt: 'noon',
      number: 43256,
      ingredients: ['id64582','id725245']
}


describe('test ordersSlice',() => {

  it('should get user orders and add it in state',() => {
    const referenceState = {
      userOrders: mockRequestData,
      userOrdersRequest: RequestStatus.Success,
      orderByNum: undefined,
      orderByNumRequest: RequestStatus.Idle
      
    }

    const actualState = ordersReducer(
      {
        ...initialState,
        userOrdersRequest: RequestStatus.Loading
      },
      getOrders.fulfilled(mockRequestData, '')
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should toggle userOrdersRequest to Loading by pending',() => {
    const referenceState = {
      userOrders: [],
      userOrdersRequest: RequestStatus.Loading,
      orderByNum: undefined,
      orderByNumRequest: RequestStatus.Idle
      
    }

    const actualState = ordersReducer(
      {
        ...initialState,
      },
      getOrders.pending('')
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should toggle userOrdersRequest to Failed by rejected',() => {
    const referenceState = {
      userOrders: [],
      userOrdersRequest: RequestStatus.Failed,
      orderByNum: undefined,
      orderByNumRequest: RequestStatus.Idle
      
    }

    const actualState = ordersReducer(
      {
        ...initialState,
        userOrdersRequest: RequestStatus.Loading
      },
      getOrders.rejected(Error('403'),'')
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should get order by number and add it in state',() => {
    const referenceState = {
      userOrders: [],
      userOrdersRequest: RequestStatus.Idle,
      orderByNum: mockOrderData,
      orderByNumRequest: RequestStatus.Success
    }

    const actualState = ordersReducer(
      {
        ...initialState,
        orderByNumRequest: RequestStatus.Loading
      },
      getOrderByNumber.fulfilled(mockRequestData, '', 434221)
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should toggle orderByNumber to undefined and toggle requestStatus on Loading by pending',() => {
    const referenceState = {
      userOrders: [],
      userOrdersRequest: RequestStatus.Idle,
      orderByNum: undefined,
      orderByNumRequest: RequestStatus.Loading
    }

    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrderByNumber.pending('', 434221)
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should toggle orderByNumberRequest to Failed by reject',() => {
    const referenceState = {
      userOrders: [],
      userOrdersRequest: RequestStatus.Idle,
      orderByNum: undefined,
      orderByNumRequest: RequestStatus.Failed
    }

    const actualState = ordersReducer(
      {
        ...initialState,
        orderByNumRequest: RequestStatus.Loading
      },
      getOrderByNumber.rejected(Error('403'),'',403)
    )
    
    expect(actualState).toEqual(referenceState)
  });
});
