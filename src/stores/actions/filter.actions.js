import {FILTER_TASK_LIST} from './../constants/filter.constants'

export const filterTasks = filters => {
  return {
    type: FILTER_TASK_LIST,
    filters
  }
}
