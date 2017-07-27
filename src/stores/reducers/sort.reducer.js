import {SORT_TASK_LIST, ASC, DESC} from './../constants/sort.constants'

const initialState = {sortBy:'', order:ASC};

const sort = (state = initialState, action) => {
  switch (action.type) {
    case SORT_TASK_LIST:
      console.log('action.filters',action.criteria, state);
      return Object.assign({},state, {...action.criteria})

    default:
      return state
  }
}

export default sort
