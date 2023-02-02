const initialState = {};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
  case 'ACTION_1':
    return {};

  case 'ACTION_2':
    return {};

  default:
    return state;
  }
}