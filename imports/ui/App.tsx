import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/taskCollection';
import { TaskType } from '../types/Task';
import { TaskForm } from './Taskform';
import { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';

const toggleChecked = ({ _id, isChecked }: TaskType) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  });
};
const deleteTask = ({ _id }: { _id: string }) => TasksCollection.remove(_id);


export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });
  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;
  const logout = () => Meteor.logout();
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
          <h1>
            📝️ To Do List
            {pendingTasksTitle}
          </h1>
          </div>
        </div>
      </header>

      <div className="main">
      {user ? ( <>
        <div className="user" onClick={logout}>
          {user.username} 🚪
        </div>
        <TaskForm user={user}/>
        <div className="filter">
         <button onClick={() => setHideCompleted(!hideCompleted)}>
           {hideCompleted ? 'Show All' : 'Hide Completed'}
         </button>
        </div>
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
        </>) : <LoginForm />}
      </div>
    </div>
  );
};
