import { combineReducers } from 'redux'
import tasks from './tasks.reducer'
import filters from './filter.reducer'
import sort from './sort.reducer'
import { routerReducer } from 'react-router-redux'

const taskListApp = combineReducers({
  tasks,
  filters,
  sort,
  routing: routerReducer
})

export default taskListApp
