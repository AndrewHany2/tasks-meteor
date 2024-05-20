import React from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/taskCollection';
import { TaskType } from '../types/Task';
import { TaskForm } from './Taskform';

const toggleChecked = ({ _id, isChecked }: TaskType) => {
  debugger;
  const test = TasksCollection.update(_id, {
    $set: {
      isChecked: true
    }
  });
};
const deleteTask = ({ _id }: { _id: string }) => TasksCollection.remove(_id);


export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Welcome to Meteor!</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <ul className="tasks">
          {tasks.map((task: TaskType) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
