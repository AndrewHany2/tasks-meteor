import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/taskCollection';
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = 'andrew';
const SEED_PASSWORD = 'andrew123';
const insertTask = (taskText: string) => TasksCollection.insert({ text: taskText, isChecked: false });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});