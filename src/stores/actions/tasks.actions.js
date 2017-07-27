import {ADD_TASK_REQUEST, ADD_TASK_RESPONSE, UPDATE_TASK_REQUEST,UPDATE_TASK_RESPONSE, DELETE_TASK_REQUEST, DELETE_TASK_RESPONSE, COMPLETE_TASK_REQUEST, COMPLETE_TASK_RESPONSE, RECEIVE_TASKS, REQUEST_TASKS, REQUEST_CATAGORIES, RECEIVE_CATAGORIES, REQUEST_TASK, RECEIVE_TASK} from './../constants/tasks.constants'
import {FILTER_TASK_LIST} from './../constants/filter.constants'
import fetch from 'isomorphic-fetch'
import { push , replace } from 'react-router-redux'

export const addTaskRequest = () => {
  return {
    type: ADD_TASK_REQUEST,
  }
}

export const addTaskResponse = task => {
  return {
    type: ADD_TASK_RESPONSE,
    task
  }
}

export const updateTaskRequest = task => {
  return {
    type: UPDATE_TASK_REQUEST
  }
}

export const updateTaskResponse = task => {
  return {
    type: UPDATE_TASK_RESPONSE,
    task
  }
}

export const deleteTaskRequest = id => {
  return {
    type: DELETE_TASK_REQUEST,
    id
  }
}

export const deleteTaskResponse = id => {
  return {
    type: DELETE_TASK_RESPONSE,
    id
  }
}

export const completeTaskRequest = id => {
  return {
    type: COMPLETE_TASK_REQUEST,
    id
  }
}

export const completeTaskResponse = task => {
  return {
    type: COMPLETE_TASK_RESPONSE,
    task
  }
}


function requestTask() {
  return {
    type: REQUEST_TASK
  }
}

function receiveTask(json) {
  console.log('json',json);
  return {
    type: RECEIVE_TASK,
    currentTask: json,
    receivedAt: Date.now()
  }
}

export function fetchTask(id) {
  return dispatch => {
    dispatch(requestTask())
    return fetch(`http://localhost:3000/tasks/${id}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTask(json)))
  }
}

function requestTasks() {
  return {
    type: REQUEST_TASKS
  }
}


function receiveTasks(json) {
  console.log('json',json);
  return {
    type: RECEIVE_TASKS,
    tasks: json.map(child => child),
    receivedAt: Date.now()
  }
}

export function fetchTasks() {
  return dispatch => {
    dispatch(requestTasks())
    return fetch(`http://localhost:3000/tasks`)
      .then(response => response.json())
      .then(json => dispatch(receiveTasks(json)))
  }
}

function requestCatagories() {
  return {
    type: REQUEST_CATAGORIES
  }
}

function receiveCatagories(json) {
  console.log('json',json);
  return {
    type: RECEIVE_CATAGORIES,
    catagories: json.map(child => child),
    receivedAt: Date.now()
  }
}

function fetchCatagories() {
  return dispatch => {
    dispatch(requestCatagories())
    return fetch(`http://localhost:3000/catagories`)
      .then(response => response.json())
      .then(json => dispatch(receiveCatagories(json)))
  }
}

function shouldFetchCatagories(state) {
  const catagories = state.catagories
  if (!catagories) {
    return true
  } else {
    return false
  }
}

export function fetchCatagoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCatagories(getState())) {
      return dispatch(fetchCatagories())
    }
  }
}

export function addTask(task) {
  return dispatch => {
    dispatch(addTaskRequest())
    return fetch(`http://localhost:3000/tasks`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(json =>  { dispatch(addTaskResponse(task));dispatch(push(`/tasks`));})
  }
}

export function updateTask(task) {
  return dispatch => {
    dispatch(updateTaskRequest())
    return fetch(`http://localhost:3000/tasks/${task.id}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(json => { dispatch(updateTaskResponse(task));dispatch(push(`/tasks`));})

  }
}

export function deleteTask(id) {
  return dispatch => {
    dispatch(deleteTaskRequest())
    return fetch(`http://localhost:3000/tasks/${id}`,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => dispatch(deleteTaskResponse(id)))

  }
}

export function completeTask(task) {
  return dispatch => {
    dispatch(completeTaskRequest())
    let modifiedTask = Object.assign({},task,{complete:true});
    return fetch(`http://localhost:3000/tasks/${task.id}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedTask)
    })
      .then(response => response.json())
      .then(json => dispatch(completeTaskResponse(modifiedTask)))
  }
}
