import {SORT_TASK_LIST} from './../constants/sort.constants'

export const sortTasks = criteria => {
  return {
    type: SORT_TASK_LIST,
    criteria
  }
}
