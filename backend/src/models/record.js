import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating User schema, sort of like working with an ORM
const RecordSchema = new Schema({
  Task_ID: {
    type: String,
    required: [true, 'User_ID field is required and should be unique.']
  },
  User_ID: {
    type: String,
    required: [true, 'User_ID field is required and should be unique.']
  },
  Time: {
    type: Date,
    required: [true, 'Time field is required and should be unique.']
  },
  Frequency: {
    type: Number
  },
  Daily_Desc: {
    type: String
  }
})
// Creating a table within database with the defined schema
const Record = mongoose.model('records', RecordSchema)
// Exporting table for querying and mutating
export default Record;
