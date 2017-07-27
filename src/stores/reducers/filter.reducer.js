import {FILTER_TASK_LIST} from './../constants/filter.constants'

const initialState = {showComplete:true, showPending:true};


const filters = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_TASK_LIST:
      console.log('action.filters',action.filters, state);
      return Object.assign({},state, {...action.filters})

    default:
      return state
  }
}

export default filters
