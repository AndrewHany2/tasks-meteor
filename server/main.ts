import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/taskCollection';

const insertTask = (taskText: string) => TasksCollection.insert({ text: taskText, isChecked: false });

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});