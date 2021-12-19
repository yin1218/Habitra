import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating User schema, sort of like working with an ORM
const TaskSchema = new Schema({
  Title: {
    type: String,
    required: [true, 'Title field is required.']
  },
  Icon: {
    type: String
  },
  Description: {
    type: String
  },
  Close_Time: {
    type: Date
  },
  Is_Closed: {
    type: Boolean
  },
  Threshold: {
    type: Number
  },
  Start_Hour: {
    type: String
  },
  End_Hour: {
    type: String
  },
  Working_Day: {
    type: [Number]
  },
  Punish: {
    type: Number
  },
  Account_Day: {
    type: Date
  },
  Need_Daily_Desc: {
    type: Boolean
  }
}, {
  collection: 'tasks',
  timestamps: { createdAt: 'Create_Time'}
}
)
// Creating a table within database with the defined schema
const Task = mongoose.model('tasks', TaskSchema)
// Exporting table for querying and mutating
export default Task;
