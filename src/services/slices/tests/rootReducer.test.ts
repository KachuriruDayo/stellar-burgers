import { configureStore } from "@reduxjs/toolkit";
import { RequestStatus } from "../../../utils/types";
import { getFeeds } from "../../../services/thunk/feeds";
import rootReducer from "../../../services/rootReducer";

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
        ingredients: ['id64582','id725245']
      }
    ],
    success: true,
    total: 1,
    totalToday: 1
  },
  requestStatus: RequestStatus.Success
};

describe('rootReducer test',() => {
  const mockUncorrectDispatch = () => {
    return null
  }

  it('should to test the correctness of work rootReducer', async () => {
    const store = configureStore({reducer: rootReducer});

      global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            orders: [
              {
                _id: 'sue43j67jys9iekg',
                status: 'done',
                name: 'Dave',
                createdAt: 'morning',
                updatedAt: 'noon',
                number: 43256,
                ingredients: ['id64582','id725245']
              }
            ],
            success: true,
            total: 1,
            totalToday: 1
          }),
      })
    ) as jest.Mock;

    await store.dispatch(getFeeds());
    const state = store.getState().feeds;
    expect(state).toEqual(mockReferenceState);

  })
});
