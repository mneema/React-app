import {ADD_TASK_REQUEST, ADD_TASK_RESPONSE, UPDATE_TASK_REQUEST,UPDATE_TASK_RESPONSE, DELETE_TASK_REQUEST, DELETE_TASK_RESPONSE, COMPLETE_TASK_REQUEST, COMPLETE_TASK_RESPONSE, RECEIVE_TASKS, REQUEST_TASKS, REQUEST_CATAGORIES, RECEIVE_CATAGORIES, RECEIVE_TASK, REQUEST_TASK} from './../constants/tasks.constants'


const initialState = {tasks:[],isFetching:false, catagories:[], catagoryLoaded:false, currentTask:{}};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case ADD_TASK_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        tasks: [...state.tasks, action.task],
      })
    case UPDATE_TASK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case UPDATE_TASK_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        tasks: state.tasks.map(task => (task.id === action.task.id ? action.task : task)),
      })
    case DELETE_TASK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case DELETE_TASK_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        tasks: state.tasks.filter(task => (task.id === action.id ? false : true)),
      })
    case COMPLETE_TASK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case COMPLETE_TASK_RESPONSE:
      return Object.assign({}, state, {
        isFetching: false,
        tasks: state.tasks.map(task => (task.id === action.task.id ? action.task : task)),
      })
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case REQUEST_TASKS, REQUEST_TASK:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_TASKS:
    console.log('new tasks', action.tasks);
      return Object.assign({}, state, {
        isFetching: false,
        tasks: action.tasks,
      })
    case RECEIVE_TASK:
    console.log('new task', action.tasks);
      return Object.assign({}, state, {
        isFetching: false,
        currentTask: action.currentTask,
      })
    case REQUEST_CATAGORIES:
      return Object.assign({}, state, {
        catagoryLoaded: false,
      })
    case RECEIVE_CATAGORIES:
    console.log('new catagories', action.catagories);
      return Object.assign({}, state, {
        catagoryLoaded: true,
        catagories: action.catagories,
      })
    default:
      return state
  }
}

export default tasks
