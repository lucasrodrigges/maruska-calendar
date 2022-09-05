import { SET_MONTH } from '../actions';

const INITIAL_STATE = {
  currMonth: '',
  currDay: '',
};

// eslint-disable-next-line default-param-last
const calendar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MONTH: return {
      ...state,
      currMonth: action.month,
    };

    default:
      return state;
  }
};

export default calendar;
