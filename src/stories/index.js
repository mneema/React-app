import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Navigation from './../components/navigation/nav.component';
import About from './../components/about/about.component';
import Filter from './../components/filter/filter.component';
import SortBar from './../components/sortbar/sortbar.component';
import Task from './../components/task/task.component';
import TaskList from './../components/tasklist/tasklist.component';
import TaskForm from './../components/taskform/taskform.component';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('About', module).add('to Storybook', () => <About />);

storiesOf('Filter', module).add('to Storybook', () => <Filter  />);

const sortOptions = {sortBy:'catagory', order:'ASC'}
storiesOf('Sort Bar', module).add('to Storybook', () => <SortBar sort={sortOptions}  />);

const task = {id:1, catagory:'PERSONAL', description:'This is my new task. It is mandatory.', dueDate:'10-09-2017', complete:false};
storiesOf('Task Card', module).add('Pending Task', () => <Task task={task}  />)
                              .add('Complete Task', () => <Task task={Object.assign({},task, {complete:true})}  />);

const tasks = [task, Object.assign({},task,{id:2}), Object.assign({},task,{id:3,complete:true}),Object.assign({},task,{id:4,complete:true})];
const filters ={showComplete:true,showPending:true};
const sort = {sortBy:'catagory', order:'ASC'};
storiesOf('Task List', module).add('Task List', () => <TaskList data={tasks} filters={filters} sort={sort} />);

const catagories = [
  {
    "id": 1,
    "code": "PERSONAL",
    "description": "Personal"
  },
  {
    "id": 1,
    "code": "WORK",
    "description": "Work"
  },
  {
    "id": 1,
    "code": "SOCIAL",
    "description": "Social"
  }
];
storiesOf('Task Form', module).add('Task Form', () => <TaskForm data={task} catagories={catagories} onSubmit={()=> {return true;}} />);
