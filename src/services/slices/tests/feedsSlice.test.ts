import { feedsSlice } from '../feedsSlice';
import { getFeeds } from '../../thunk/feeds';
import { RequestStatus } from '../../../utils/types';
import { error } from 'console';

const initialState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  requestStatus: RequestStatus.Idle
};

const feedsReducer = feedsSlice.reducer;

const mockReferenceState = {
  data: {
    orders: [
      {
        _id: 'sue43j67jys9iekg',
        status: 'done',
        name: 'Dave',
        createdAt: 'morning',
        updatedAt: 'noon',
        number: 43256,
        ingredients: ['id64582', 'id725245']
      }
    ],
    success: true,
    total: 1,
    totalToday: 1
  },
  requestStatus: RequestStatus.Success
};

const mockRequestData = {
  orders: [
    {
      _id: 'sue43j67jys9iekg',
      status: 'done',
      name: 'Dave',
      createdAt: 'morning',
      updatedAt: 'noon',
      number: 43256,
      ingredients: ['id64582', 'id725245']
    }
  ],
  success: true,
  total: 1,
  totalToday: 1
};

describe('test feedsSlice', () => {
  it('should set Loading to RequestStatus when pending is dispatch', () => {
    const referenceState = {
      data: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      requestStatus: RequestStatus.Loading
    };

    const actualState = feedsReducer(
      {
        ...initialState
      },
      getFeeds.pending('')
    );

    expect(actualState).toEqual(referenceState);
  });

  it('should set Success to RequestStatus and add orders data in data when fulfilled is dispatch', () => {
    const actualState = feedsReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getFeeds.fulfilled(mockRequestData, 'success')
    );

    expect(actualState).toEqual(mockReferenceState);
  });

  it('should set Failed to RequestStatus when rejected is dispatch', () => {
    const referenceState = {
      data: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      requestStatus: RequestStatus.Failed
    };

    const actualState = feedsReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getFeeds.rejected(Error('403'), '')
    );

    expect(actualState).toEqual(referenceState);
  });
});

// it('should set Success to RequestStatus and add orders data in data when fulfilled is dispatch', async () => {
//   const store = configureStore({reducer: {feeds: feedsSlice.reducer}});

//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () =>
//         Promise.resolve({
//           orders: [
//             {
//               _id: 'sue43j67jys9iekg',
//               status: 'done',
//               name: 'Dave',
//               createdAt: 'morning',
//               updatedAt: 'noon',
//               number: 43256,
//               ingredients: ['id64582','id725245']
//             }
//           ],
//           success: true,
//           total: 1,
//           totalToday: 1
//         }),
//     })
//   ) as jest.Mock;

//   await store.dispatch(getFeeds());
//   const state = store.getState().feeds;
//   expect(state).toEqual(mockReferenceState);
// })
